import React, { useState, useEffect } from 'react';
import { ChefHat, Loader2, Sparkles, AlertCircle } from 'lucide-react';

const LOADING_TIPS = [
  "Formulating waste-reduction equations...",
  "Coordinating ingredient duplicates between Breakfast and Dinner...",
  "Auditing ingredient costs to respect your budget limits...",
  "Checking dietary labels to ensure 100% security safety...",
  "Slicing onions... did you know chewing gum can prevent tears?",
  "Roasting peppers... did you know keeping seeds in adds extra heat?",
  "Minimizing greenhouse gas footprints by maximizing pantry usage...",
  "Consulting the virtual Michelin guide for your cuisine style...",
  "Structuring step-by-step cooking timelines to keep prep fast..."
];

export const LoadingScreen: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-md mx-auto animate-fade-in">
      
      {/* Dynamic Animated Cooking Icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-xl animate-ping opacity-60" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/10">
          <ChefHat className="h-10 w-10 animate-bounce" />
        </div>
      </div>

      {/* Main Loading text */}
      <div className="space-y-2">
        <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-orange-500" /> SmartChef is Cooking
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">Please wait while the AI parses recipes</p>
      </div>

      {/* Rotating Tip Card */}
      <div className="p-4.5 rounded-2xl bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100/40 dark:border-orange-900/40 min-h-[90px] flex items-center justify-center">
        <p className="text-xs text-orange-850 dark:text-orange-300 font-medium italic transition-all duration-300">
          "{LOADING_TIPS[tipIndex]}"
        </p>
      </div>

      {/* Progressive loading bar tracker */}
      <div className="w-44 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mx-auto">
        <div className="h-full bg-orange-500 animate-[pulse_1.5s_infinite] w-full" />
      </div>

      <p className="text-[10px] text-gray-400 font-mono">Usually completes within 30 seconds</p>
    </div>
  );
};
