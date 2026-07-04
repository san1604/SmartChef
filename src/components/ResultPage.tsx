import React, { useState } from 'react';
import { SmartChefPlan } from '../types';
import { 
  CheckSquare, Square, Printer, Copy, Share2, RefreshCw, Sparkles, 
  Clock, Flame, Scale, ChevronDown, ChevronUp, DollarSign, 
  CheckCircle, HelpCircle, Utensils, ShoppingBag, ArrowLeft, Lightbulb
} from 'lucide-react';
import { useToast } from './Toast';

interface ResultPageProps {
  plan: SmartChefPlan;
  onBackToPlanner: () => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  plan,
  onBackToPlanner,
  onRegenerate,
  isRegenerating,
}) => {
  const { showToast } = useToast();
  
  // Expand/collapse states for meals
  const [expandedMeal, setExpandedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | null>('breakfast');

  // Interactive Checklist states
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});

  const toggleChecklist = (index: number) => {
    setChecklist(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Grouped grocery list selector/reducer
  const categories = ['Vegetables', 'Protein', 'Dairy', 'Pantry', 'Spices', 'Others'] as const;
  const groupedGrocery = categories.reduce((acc, cat) => {
    acc[cat] = plan.groceryList.filter((item) => item.category === cat);
    return acc;
  }, {} as Record<string, typeof plan.groceryList>);

  // Copy Grocery List to clipboard
  const copyGroceryToClipboard = () => {
    try {
      const neededItems = plan.groceryList
        .filter(item => item.status === 'Need to Buy')
        .map(item => `- [ ] ${item.name} (~$${item.estimatedCost})`)
        .join('\n');
      
      const textToCopy = `SmartChef AI Needed Grocery Shopping List:\n\n${neededItems}\n\nPlan generated via SmartChef AI.`;
      
      navigator.clipboard.writeText(textToCopy);
      showToast('Grocery list copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy. Try manual selection.', 'error');
    }
  };

  // Share action
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My SmartChef AI Culinary Plan',
        text: `Check out my daily zero-waste meal plan: ${plan.meals.breakfast.dishName}, ${plan.meals.lunch.dishName}, & ${plan.meals.dinner.dishName}!`,
        url: window.location.href,
      })
      .then(() => showToast('Shared successfully!', 'success'))
      .catch((err) => {
        // Ignored or handled silently
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      showToast('Application link copied to clipboard. Share it with friends!', 'info');
    }
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 space-y-8 print-container transition-colors duration-200">
      
      {/* Action Header Button Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print border-b border-gray-100 dark:border-gray-800/80 pb-6">
        <button
          onClick={onBackToPlanner}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Custom Planner
        </button>

        <div className="flex flex-wrap gap-2 action-buttons">
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
          >
            <Printer className="h-4 w-4" /> Print Plan
          </button>

          {/* Copy List */}
          <button
            onClick={copyGroceryToClipboard}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
          >
            <Copy className="h-4 w-4" /> Copy Shopping List
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
          >
            <Share2 className="h-4 w-4" /> Share Plan
          </button>

          {/* Regenerate */}
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white transition shadow shadow-orange-500/10 disabled:opacity-75"
          >
            <RefreshCw className={`h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} /> 
            {isRegenerating ? 'Regenerating...' : 'Regenerate Plan'}
          </button>
        </div>
      </div>

      {/* AI Header Summary */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-500/10 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none">
          <Sparkles className="h-full w-auto max-w-[200px]" />
        </div>
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/15 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> Personalized culinary Blueprint
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            Your Custom Meal Masterpiece is Ready!
          </h1>
          <p className="text-orange-50/90 text-sm max-w-3xl leading-relaxed font-sans">
            {plan.summary}
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Recipes, Substitutions, Interactive checklists */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Breakfast, Lunch, Dinner Sections */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Utensils className="text-orange-500 h-5 w-5" /> Your Daily Meals
            </h2>

            {(['breakfast', 'lunch', 'dinner'] as const).map((mealType) => {
              const meal = plan.meals[mealType];
              const isExpanded = expandedMeal === mealType;
              
              return (
                <div 
                  key={mealType} 
                  className="bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  {/* Meal Header Panel */}
                  <button
                    onClick={() => setExpandedMeal(isExpanded ? null : mealType)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-500 flex flex-col items-center justify-center font-display font-black uppercase text-xs">
                        <span className="text-[10px] text-orange-400 font-mono tracking-tight">{mealType[0]}</span>
                        <span className="-mt-1 text-base">{mealType.substring(0, 3)}</span>
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-gray-950 dark:text-white text-base leading-tight">
                          {meal.dishName}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">{meal.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Macro summaries on desktop */}
                      <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
                        <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                          <Clock className="h-3 w-3" /> {meal.cookingTime}m
                        </span>
                        <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                          <Flame className="h-3 w-3 text-orange-500" /> {meal.calories} kcal
                        </span>
                        <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                          <Scale className="h-3 w-3 text-emerald-500" /> {meal.protein}g protein
                        </span>
                      </div>
                      
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                    </div>
                  </button>

                  {/* Meal Expanded Detail panel */}
                  <div 
                    className={`border-t border-gray-50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-gray-900/10 px-5 transition-all duration-300 overflow-hidden ${
                      isExpanded ? 'max-h-[1600px] py-6' : 'max-h-0'
                    }`}
                  >
                    {/* Mobile Macros */}
                    <div className="flex sm:hidden flex-wrap gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-mono mb-5 pb-4 border-b border-gray-100 dark:border-gray-800/40">
                      <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-850 px-2 py-1 rounded">
                        <Clock className="h-3 w-3" /> {meal.cookingTime}m
                      </span>
                      <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-850 px-2 py-1 rounded">
                        <Flame className="h-3 w-3 text-orange-500" /> {meal.calories} kcal
                      </span>
                      <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-850 px-2 py-1 rounded">
                        <Scale className="h-3 w-3 text-emerald-500" /> {meal.protein}g Prot
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      
                      {/* Left: Ingredients checklist panel */}
                      <div className="md:col-span-2 space-y-3.5">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Ingredients Portion</h4>
                        <ul className="space-y-2">
                          {meal.ingredients.map((ing, i) => (
                            <li 
                              key={i}
                              className="text-xs text-gray-700 dark:text-gray-300 flex justify-between items-center bg-white dark:bg-gray-850 p-2.5 rounded-xl border border-gray-100/50 dark:border-gray-800/45"
                            >
                              <span className="font-medium text-gray-900 dark:text-white">{ing.name}</span>
                              <span className="font-mono text-gray-500 dark:text-gray-400 text-[11px] px-1.5 py-0.5 rounded bg-gray-50 dark:bg-gray-900">{ing.amount}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Steps execution list */}
                      <div className="md:col-span-3 space-y-3.5">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Culinary Preparation</h4>
                        <ol className="space-y-3">
                          {meal.steps.map((step, idx) => (
                            <li 
                              key={idx}
                              className="flex gap-3 text-xs text-gray-600 dark:text-gray-300 leading-relaxed align-top"
                            >
                              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950/60 text-[10px] font-bold text-orange-600 dark:text-orange-400 font-mono mt-0.5">
                                {idx + 1}
                              </span>
                              <p className="flex-1 text-gray-700 dark:text-gray-300">{step}</p>
                            </li>
                          ))}
                        </ol>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clever Substitutions panel */}
          {plan.substitutions.length > 0 && (
            <div className="bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-gray-950 dark:text-white flex items-center gap-2">
                <HelpCircle className="text-orange-500 h-5 w-5" /> Smart Substitutions
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">Missing an ingredient or need to trade out dietary limits? Use these AI culinary recommendations:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.substitutions.map((sub, i) => (
                  <div key={i} className="p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold mb-2 flex-wrap">
                        <span className="text-gray-400 line-through decoration-rose-500 decoration-2">{sub.originalIngredient}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded font-bold font-mono">{sub.substitutedIngredient}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans mt-1">
                        {sub.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cooking Interactive Checklist */}
          {plan.todo && plan.todo.length > 0 && (
            <div className="bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 space-y-4 no-print">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckSquare className="text-orange-500 h-5 w-5" /> Interactive Checklist
                </h3>
                <span className="text-xs font-mono text-gray-400">
                  {Object.values(checklist).filter(Boolean).length} / {plan.todo.length} Completed
                </span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">Tick off tasks as you navigate grocery shopping, meal preparation, and cleanup.</p>
              
              <div className="space-y-2">
                {plan.todo.map((item, idx) => {
                  const isChecked = !!checklist[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleChecklist(idx)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                        isChecked
                          ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40 text-gray-400 line-through'
                          : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-850 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {isChecked ? (
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                      )}
                      <span className="text-xs">{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right 1 Column: Budget, Grocery List, Timelines, Tips */}
        <div className="space-y-8">
          
          {/* Budget reconciliation card */}
          <div className="bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign className="text-orange-500 h-5 w-5" /> Budget Analysis
            </h3>
            
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100/50 dark:border-orange-900/35 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-gray-400">Total Budget</span>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white font-mono">${plan.budget.budget.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-gray-400">Estimated cost</span>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white font-mono">${plan.budget.estimatedCost.toFixed(2)}</p>
                </div>
              </div>

              {/* Saved Cash Badge */}
              <div className="pt-3 border-t border-orange-100 dark:border-orange-900/40 flex justify-between items-center text-xs font-semibold">
                <span className="text-gray-500 dark:text-gray-400">Total Saved Cash:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">+${plan.budget.moneySaved.toFixed(2)}</span>
              </div>

              {/* Status compliance label */}
              <div className="flex justify-center pt-1.5">
                {plan.budget.withinBudget ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    <CheckCircle className="h-3.5 w-3.5" /> Within Budget Limit
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold">
                    Over Budget Limit
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* Grouped Grocery list */}
          <div className="bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 space-y-4 print-page-break">
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="text-orange-500 h-5 w-5" /> Shopping List
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">Grouped ingredient inventory to ease aisle navigation:</p>

            <div className="space-y-4">
              {categories.map((cat) => {
                const items = groupedGrocery[cat] || [];
                if (items.length === 0) return null;

                return (
                  <div key={cat} className="space-y-1.5">
                    <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest font-mono">
                      {cat} ({items.length})
                    </h4>
                    
                    <div className="space-y-1.5 pl-1">
                      {items.map((item, idx) => (
                        <div 
                          key={idx}
                          className="flex justify-between items-center text-xs p-2 rounded-lg border border-gray-50 dark:border-gray-800/60 bg-gray-50/30 dark:bg-gray-900/10"
                        >
                          <span className="font-medium text-gray-850 dark:text-gray-200">{item.name}</span>
                          
                          <div className="flex items-center gap-2">
                            {item.status === 'Already Available' ? (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-850 text-gray-400">
                                Available
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 flex items-center gap-1 font-mono">
                                Buy ~${item.estimatedCost}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chronological Cooking Timeline */}
          {plan.timeline && plan.timeline.length > 0 && (
            <div className="bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="text-orange-500 h-5 w-5" /> Prep Timeline
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">Chronological cook-along schedule:</p>
              
              <div className="relative border-l border-orange-100 dark:border-orange-950 ml-2.5 pl-4.5 space-y-5">
                {plan.timeline.map((step, idx) => (
                  <div key={idx} className="relative text-xs">
                    {/* Bullet marker */}
                    <span className="absolute -left-[23.5px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-gray-850 border-2 border-orange-500" />
                    
                    <div>
                      <span className="font-bold text-orange-600 dark:text-orange-400 font-mono tracking-tight">{step.time}</span>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mt-0.5">{step.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Waste-Reduction Tips */}
          {plan.tips && plan.tips.length > 0 && (
            <div className="bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Lightbulb className="text-amber-500 h-5 w-5" /> Professional Waste Tips
              </h3>
              
              <ul className="space-y-3">
                {plan.tips.map((tip, idx) => (
                  <li 
                    key={idx} 
                    className="text-xs text-gray-650 dark:text-gray-300 leading-relaxed flex gap-2"
                  >
                    <span className="text-amber-500 text-sm flex-shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

    </main>
  );
};
