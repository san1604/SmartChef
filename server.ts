import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Set up JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lazy initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required. Please set it in the Secrets panel.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// -----------------------------------------------------------------------------
// API Endpoints
// -----------------------------------------------------------------------------

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Generate Cooking Meal Plan
app.post('/api/generate-plan', async (req: Request, res: Response) => {
  try {
    const input = req.body;
    
    // Extract input parameters with defaults
    const {
      numPeople = 1,
      budget = 25,
      country = 'United States',
      cuisine = 'Any',
      diet = [],
      ingredients = [],
      cookingSkill = 'Beginner',
      cookingTime = 30,
      kitchenEquipment = [],
    } = input;

    const ai = getAiClient();

    // Prepare custom prompt based on user specs
    const dietStr = diet.length > 0 ? diet.join(', ') : 'None';
    const ingredientsStr = ingredients.length > 0 ? ingredients.join(', ') : 'None specified (feel free to suggest standard affordable staples)';
    const equipmentStr = kitchenEquipment.length > 0 ? kitchenEquipment.join(', ') : 'Standard kitchen';

    const systemInstruction = `You are SmartChef AI, a Michelin-starred home economist, meal planner, and expert chef. 
Your goal is to design a personalized daily meal plan (Breakfast, Lunch, Dinner) and grocery list for ${numPeople} people.
The user is located in ${country} and has a total budget of ${budget} (in local currency/USD equivalent).
Your generated recipes MUST strictly satisfy:
- Dietary Restrictions: ${dietStr}
- Cuisine Style: ${cuisine}
- Available Ingredients (reuse these as much as possible to minimize food waste): ${ingredientsStr}
- Cooking Skill Level: ${cookingSkill} (Tailor instructions and complexity accordingly)
- Available Kitchen Equipment: ${equipmentStr} (Do not recommend recipes requiring unlisted gear)
- Active Prep & Cook Time Limit per meal: ~${cookingTime} minutes

STRICT ADHERENCE RULES:
1. Budget Rule: The total "estimatedCost" of ALL "Need to Buy" grocery items must NOT exceed ${budget}. Ensure estimated cost is a realistic value based on current staples. If the budget is tight, optimize for high-yield, cheap ingredients (like potatoes, beans, rice, pasta).
2. Food Waste & Reuse Rule: Design recipes so that bought ingredients are reused across multiple meals (e.g., if buying spinach for lunch, use the rest in the dinner curry or breakfast omelet).
3. Substitution Rule: Provide 2-3 clever ingredient substitutions under "substitutions". E.g., if they have no chicken, suggest paneer/tofu and explain why it fits.
4. Timeline Rule: Provide a step-by-step evening/prep chronological cooking timeline (e.g., prep at 6:00 PM, eat at 7:00 PM).
5. Tips Rule: Provide 3 useful kitchen/storage tips to reduce waste and stay budget-friendly.`;

    const userPrompt = `Create a detailed 1-day culinary meal plan. 
Review my inputs:
- People: ${numPeople}
- Budget: ${budget}
- Cuisine: ${cuisine}
- Diets: ${dietStr}
- Available Ingredients: ${ingredientsStr}
- Skill: ${cookingSkill}
- Time Limit: ${cookingTime} mins
- Equipment: ${equipmentStr}

Generate a comprehensive, delicious, highly satisfying and perfectly costed response. Include exact estimated costs for each grocery item. Identify items I already have as "Already Available" and items I need to buy as "Need to Buy". Ensure the sum of estimated costs of "Need to Buy" items is under ${budget}.`;

    // Define the rigid JSON response schema using Type enum
    const mealSchema = {
      type: Type.OBJECT,
      properties: {
        dishName: { type: Type.STRING, description: 'Elegant/appealing name of the dish' },
        description: { type: Type.STRING, description: 'Short sensory description of the dish' },
        cookingTime: { type: Type.INTEGER, description: 'Total prep and cooking time in minutes' },
        ingredients: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: 'Ingredient name' },
              amount: { type: Type.STRING, description: 'Measurement amount (e.g. 2 large eggs, 100g spinach)' },
            },
            required: ['name', 'amount'],
          },
        },
        steps: {
          type: Type.ARRAY,
          items: { type: Type.STRING, description: 'Slightly detailed step-by-step instruction' },
        },
        calories: { type: Type.INTEGER, description: 'Approximate calorie count per serving' },
        protein: { type: Type.INTEGER, description: 'Approximate protein in grams per serving' },
      },
      required: ['dishName', 'description', 'cookingTime', 'ingredients', 'steps', 'calories', 'protein'],
    };

    const grocerySchema = {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: 'Name of the ingredient item' },
        category: {
          type: Type.STRING,
          enum: ['Vegetables', 'Protein', 'Dairy', 'Pantry', 'Spices', 'Others'],
          description: 'Grouping category for easy shopping',
        },
        status: {
          type: Type.STRING,
          enum: ['Already Available', 'Need to Buy'],
          description: 'Set to "Already Available" if it was in the user\'s available list, otherwise "Need to Buy"',
        },
        estimatedCost: { type: Type.NUMBER, description: 'Estimated grocery store cost for this specific portion/pack (0 if already available)' },
      },
      required: ['name', 'category', 'status', 'estimatedCost'],
    };

    const substitutionSchema = {
      type: Type.OBJECT,
      properties: {
        originalIngredient: { type: Type.STRING, description: 'Ingredient that might be missing or restricted' },
        substitutedIngredient: { type: Type.STRING, description: 'Recommended swap' },
        reason: { type: Type.STRING, description: 'Why this works culinary-wise or texture-wise' },
      },
      required: ['originalIngredient', 'substitutedIngredient', 'reason'],
    };

    const timelineSchema = {
      type: Type.OBJECT,
      properties: {
        time: { type: Type.STRING, description: 'Clock time or offset, e.g. "6:00 PM" or "T-15 mins"' },
        task: { type: Type.STRING, description: 'Instruction of what to do (preheat oven, chop, etc.)' },
      },
      required: ['time', 'task'],
    };

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING, description: 'A highly encouraging, friendly summary explaining how you optimized the daily plan' },
        budget: {
          type: Type.OBJECT,
          properties: {
            estimatedCost: { type: Type.NUMBER, description: 'Sum of all "Need to Buy" item costs' },
            budget: { type: Type.NUMBER, description: 'The user\'s total limit' },
            withinBudget: { type: Type.BOOLEAN, description: 'Whether the estimated cost is less than or equal to budget' },
            moneySaved: { type: Type.NUMBER, description: 'Budget minus estimatedCost (rounded)' },
          },
          required: ['estimatedCost', 'budget', 'withinBudget', 'moneySaved'],
        },
        meals: {
          type: Type.OBJECT,
          properties: {
            breakfast: mealSchema,
            lunch: mealSchema,
            dinner: mealSchema,
          },
          required: ['breakfast', 'lunch', 'dinner'],
        },
        groceryList: {
          type: Type.ARRAY,
          items: grocerySchema,
        },
        substitutions: {
          type: Type.ARRAY,
          items: substitutionSchema,
        },
        timeline: {
          type: Type.ARRAY,
          items: timelineSchema,
        },
        todo: {
          type: Type.ARRAY,
          items: { type: Type.STRING, description: 'Short action items for the recipe checklist' },
        },
        tips: {
          type: Type.ARRAY,
          items: { type: Type.STRING, description: 'Practical tip for zero-waste or cost-savings' },
        },
      },
      required: ['summary', 'budget', 'meals', 'groceryList', 'substitutions', 'timeline', 'todo', 'tips'],
    };

    // Invoke Gemini Content Generation API
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.2, // Keep it focused and consistent
        responseMimeType: 'application/json',
        responseSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Received empty response from the AI model.');
    }

    const planData = JSON.parse(text);
    res.json(planData);
  } catch (error: any) {
    console.error('Error in /api/generate-plan:', error);
    res.status(500).json({
      error: 'Failed to generate meal plan.',
      details: error.message || error,
    });
  }
});

// Serve frontend assets
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SmartChef Server] running at http://localhost:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start full stack server:', err);
});
