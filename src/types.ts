export interface MealPlanInput {
  numPeople: number;
  budget: number;
  country: string;
  cuisine: string;
  diet: string[]; // ['Vegetarian', 'Vegan', etc.]
  ingredients: string[];
  cookingSkill: 'Beginner' | 'Intermediate' | 'Advanced';
  cookingTime: number; // 15, 30, 45, 60
  kitchenEquipment: string[]; // ['Gas Stove', 'Microwave', etc.]
}

export interface MealIngredient {
  name: string;
  amount: string;
}

export interface Meal {
  dishName: string;
  description: string;
  cookingTime: number;
  ingredients: MealIngredient[];
  steps: string[];
  calories: number;
  protein: number;
}

export interface MealBudgetInfo {
  estimatedCost: number;
  budget: number;
  withinBudget: boolean;
  moneySaved: number;
}

export interface GroceryItem {
  name: string;
  category: 'Vegetables' | 'Protein' | 'Dairy' | 'Pantry' | 'Spices' | 'Others';
  status: 'Already Available' | 'Need to Buy';
  estimatedCost: number;
}

export interface SubstitutionItem {
  originalIngredient: string;
  substitutedIngredient: string;
  reason: string;
}

export interface TimelineItem {
  time: string;
  task: string;
}

export interface SmartChefPlan {
  summary: string;
  budget: MealBudgetInfo;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
  };
  groceryList: GroceryItem[];
  substitutions: SubstitutionItem[];
  timeline: TimelineItem[];
  todo: string[];
  tips: string[];
}

export interface SavedPlan {
  id: string;
  date: string;
  input: MealPlanInput;
  plan: SmartChefPlan;
}
