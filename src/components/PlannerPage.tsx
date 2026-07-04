import React, { useState } from 'react';
import { MealPlanInput } from '../types';
import { 
  Users, DollarSign, Globe, Utensils, ClipboardCheck, 
  Sparkles, ChefHat, Timer, Check, Plus, X, ArrowLeft, ArrowRight, Loader2
} from 'lucide-react';

interface PlannerPageProps {
  onGenerate: (data: MealPlanInput) => void;
  isGenerating: boolean;
}

const PRESET_INGREDIENTS = [
  'Eggs', 'Milk', 'Chicken Breast', 'Rice', 'Bread', 
  'Tomatoes', 'Spinach', 'Onions', 'Garlic', 'Butter', 
  'Potatoes', 'Cheddar Cheese', 'Tofu', 'Canned Beans'
];

const PRESET_CUISINES = [
  'Any', 'Italian', 'Mexican', 'Indian', 'Mediterranean', 
  'Asian', 'American', 'French', 'Middle Eastern', 'Spanish'
];

const DIETARY_LABELS = [
  'Vegetarian', 'Vegan', 'Keto', 'High Protein', 'Gluten Free', 'Dairy Free'
];

const KITCHEN_EQUIPMENT = [
  'Gas Stove', 'Microwave', 'Air Fryer', 'Oven', 'Instant Pot', 'Blender'
];

export const PlannerPage: React.FC<PlannerPageProps> = ({ onGenerate, isGenerating }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [numPeople, setNumPeople] = useState<number>(2);
  const [budget, setBudget] = useState<number>(25);
  const [country, setCountry] = useState<string>('United States');
  const [cuisine, setCuisine] = useState<string>('Any');
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState<string>('');
  const [cookingSkill, setCookingSkill] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [cookingTime, setCookingTime] = useState<number>(30);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(['Gas Stove']);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Add ingredient chip
  const addIngredient = (name: string) => {
    const trimmed = name.trim();
    if (trimmed && !ingredients.some(item => item.toLowerCase() === trimmed.toLowerCase())) {
      setIngredients([...ingredients, trimmed]);
    }
  };

  const removeIngredient = (indexToRemove: number) => {
    setIngredients(ingredients.filter((_, i) => i !== indexToRemove));
  };

  // Toggle dietary tags
  const toggleDiet = (diet: string) => {
    if (selectedDiets.includes(diet)) {
      setSelectedDiets(selectedDiets.filter(d => d !== diet));
    } else {
      setSelectedDiets([...selectedDiets, diet]);
    }
  };

  // Toggle equipment
  const toggleEquipment = (eq: string) => {
    if (selectedEquipment.includes(eq)) {
      setSelectedEquipment(selectedEquipment.filter(e => e !== eq));
    } else {
      setSelectedEquipment([...selectedEquipment, eq]);
    }
  };

  // Submit all state
  const handleSubmitPlan = () => {
    const payload: MealPlanInput = {
      numPeople,
      budget,
      country,
      cuisine,
      diet: selectedDiets,
      ingredients,
      cookingSkill,
      cookingTime,
      kitchenEquipment: selectedEquipment,
    };
    onGenerate(payload);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12 transition-colors duration-200">
      
      {/* Stepper Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-400 dark:text-gray-500 font-mono uppercase tracking-wider mb-3">
          <span>Step {currentStep} of 5</span>
          <span>
            {currentStep === 1 && 'Personal Information'}
            {currentStep === 2 && 'Diet & Cuisine'}
            {currentStep === 3 && 'Pantry Ingredients'}
            {currentStep === 4 && 'Cooking Profile'}
            {currentStep === 5 && 'Generate Meal Plan'}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Wizard Form Cards */}
      <div className="bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800/80 rounded-3xl shadow-xl shadow-gray-100/40 dark:shadow-none p-6 sm:p-8 space-y-6">
        
        {/* STEP 1: PERSONAL INFO */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="text-orange-500 h-6 w-6" /> Who are we cooking for?
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tell us about headcount, budget limits, and currency locale.</p>
            </div>

            <div className="space-y-5">
              {/* Headcount */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Number of Diners</label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNumPeople(num)}
                      className={`h-11 w-11 rounded-xl text-sm font-bold border transition ${
                        numPeople === num
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <div className="text-xs text-gray-400 dark:text-gray-500 pl-1 font-mono">Dinners/Plan</div>
                </div>
              </div>

              {/* Budget slider & input */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Daily Ingredient Budget</label>
                  <span className="text-base font-bold text-orange-600 dark:text-orange-400 font-mono">${budget} Max</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                  <span>$5 (Extremely Budget)</span>
                  <span>$50</span>
                  <span>$100 (Abundant)</span>
                </div>
              </div>

              {/* Target Country */}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-orange-400" /> Target Country / Region
                </label>
                <p className="text-xs text-gray-400 dark:text-gray-500 -mt-1">Allows the AI to tailor ingredient cost estimations to local averages.</p>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                >
                  <option value="United States">United States (USD)</option>
                  <option value="United Kingdom">United Kingdom (GBP)</option>
                  <option value="Canada">Canada (CAD)</option>
                  <option value="India">India (INR)</option>
                  <option value="Germany">Germany (EUR)</option>
                  <option value="Australia">Australia (AUD)</option>
                  <option value="Singapore">Singapore (SGD)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DIET & CUISINE */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Utensils className="text-orange-500 h-6 w-6" /> What are your preferences?
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dietary restriction safety is our top priority. Choose any tags that apply.</p>
            </div>

            <div className="space-y-6">
              {/* Cuisine Select */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Preferred Cuisine Style</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_CUISINES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCuisine(item)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                        cuisine === item
                          ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary checkmarks */}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dietary Restrictions & Intolerances</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {DIETARY_LABELS.map((diet) => {
                    const isSelected = selectedDiets.includes(diet);
                    return (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => toggleDiet(diet)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                          isSelected
                            ? 'bg-orange-50/80 dark:bg-orange-950/20 border-orange-400 text-orange-900 dark:text-orange-300 font-medium'
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-850'
                        }`}
                      >
                        <span className="text-sm">{diet}</span>
                        {isSelected ? (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span className="h-5 w-5 rounded-full border border-gray-300 dark:border-gray-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PANTRY INGREDIENTS */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ClipboardCheck className="text-orange-500 h-6 w-6" /> What ingredients do you already have?
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Type ingredients that are already in your kitchen (e.g. Eggs, Potatoes). Our AI will prioritize using these first to reduce shopping and waste.
              </p>
            </div>

            <div className="space-y-5">
              {/* Chip input */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type ingredient (e.g., Spinach) and press Add"
                    value={customIngredient}
                    onChange={(e) => setCustomIngredient(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addIngredient(customIngredient);
                        setCustomIngredient('');
                      }
                    }}
                    className="flex-1 h-11 px-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addIngredient(customIngredient);
                      setCustomIngredient('');
                    }}
                    className="px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center gap-1 font-semibold text-sm transition"
                  >
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>

                {/* Chips list */}
                {ingredients.length > 0 ? (
                  <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/80 rounded-2xl min-h-[44px]">
                    {ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/65 text-orange-900 dark:text-orange-300 text-xs font-semibold border border-orange-200/50 dark:border-orange-900/50"
                      >
                        {ing}
                        <button
                          type="button"
                          onClick={() => removeIngredient(idx)}
                          className="hover:bg-orange-200 dark:hover:bg-orange-900 rounded-full p-0.5 text-orange-600 dark:text-orange-400"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No available ingredients specified yet.</p>
                )}
              </div>

              {/* Preset suggestion list */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">Popular pantry presets (Click to Add)</label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_INGREDIENTS.map((preset) => {
                    const isAdded = ingredients.some(i => i.toLowerCase() === preset.toLowerCase());
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => addIngredient(preset)}
                        disabled={isAdded}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition flex items-center gap-1 ${
                          isAdded
                            ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {preset}
                        {!isAdded && <Plus className="h-3 w-3 text-gray-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: COOKING PROFILE */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ChefHat className="text-orange-500 h-6 w-6" /> What is your cooking profile?
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Match recipe steps to your skill tier, time limit, and kitchen equipment.</p>
            </div>

            <div className="space-y-6">
              {/* Skill Tier */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Cooking Skill Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCookingSkill(lvl)}
                      className={`py-3 rounded-xl text-xs font-bold border transition ${
                        cookingSkill === lvl
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cooking Time Limit */}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <Timer className="h-4 w-4 text-orange-400" /> Prep & Cook Time Limit (per meal)
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[15, 30, 45, 60].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setCookingTime(t)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                        cookingTime === t
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {t === 60 ? '60+ Mins' : `${t} Mins`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kitchen Equipment Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Available Kitchen Equipment</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {KITCHEN_EQUIPMENT.map((eq) => {
                    const isSelected = selectedEquipment.includes(eq);
                    return (
                      <button
                        key={eq}
                        type="button"
                        onClick={() => toggleEquipment(eq)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                          isSelected
                            ? 'bg-orange-50/80 dark:bg-orange-950/20 border-orange-400 text-orange-900 dark:text-orange-300 font-medium'
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-850'
                        }`}
                      >
                        <span className="text-xs">{eq}</span>
                        {isSelected ? (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span className="h-5 w-5 rounded-full border border-gray-300 dark:border-gray-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRM & GENERATE */}
        {currentStep === 5 && (
          <div className="space-y-6 text-center py-4 animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-500 mb-2">
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>
            
            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">All systems set!</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our SmartChef AI engine is ready to synthesize a customized, zero-waste daily menu perfectly fitted to your budget and available items.
              </p>
            </div>

            {/* Profile Summary Card */}
            <div className="p-5 border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/35 rounded-2xl text-left max-w-lg mx-auto space-y-3.5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Summary Profile</h3>
              
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-300">
                <div>
                  <span className="font-semibold text-gray-400">Headcount:</span> {numPeople} Diners
                </div>
                <div>
                  <span className="font-semibold text-gray-400">Daily Budget:</span> ${budget} Max
                </div>
                <div>
                  <span className="font-semibold text-gray-400">Cuisine Style:</span> {cuisine}
                </div>
                <div>
                  <span className="font-semibold text-gray-400">Diets:</span> {selectedDiets.length > 0 ? selectedDiets.join(', ') : 'None'}
                </div>
                <div>
                  <span className="font-semibold text-gray-400">Skill Level:</span> {cookingSkill}
                </div>
                <div>
                  <span className="font-semibold text-gray-400">Time Limit:</span> {cookingTime} mins / meal
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-gray-400">Ready Ingredients:</span>{' '}
                  {ingredients.length > 0 ? ingredients.join(', ') : 'None specified (using budget standards)'}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-gray-400">Kitchen Equipment:</span> {selectedEquipment.join(', ')}
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="pt-4 max-w-md mx-auto">
              {isGenerating ? (
                <button
                  disabled
                  type="button"
                  className="w-full h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center gap-3 font-bold shadow-lg opacity-85 cursor-not-allowed"
                >
                  <Loader2 className="h-5 w-5 animate-spin" /> Synthesizing Meal Plan...
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitPlan}
                  className="w-full h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-orange-500/15 transition-all hover:translate-y-[-2px]"
                >
                  Create Meal Plan Now <Sparkles className="h-5 w-5" />
                </button>
              )}
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">Takes less than one minute to construct precise recipe formulas.</p>
            </div>
          </div>
        )}

        {/* Navigation Actions Footer */}
        <div className="border-t border-gray-100 dark:border-gray-800/80 pt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 1 || isGenerating}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition ${
              currentStep === 1 || isGenerating
                ? 'border-gray-100 text-gray-300 dark:border-gray-800 dark:text-gray-600 cursor-not-allowed'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gray-900 dark:bg-orange-500 hover:bg-gray-800 dark:hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition shadow-md"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="w-10 h-2" /> // Empty gap when on final step
          )}
        </div>

      </div>

    </main>
  );
};
