import React from 'react';
import { SavedPlan } from '../types';
import { X, Calendar, ChefHat, Users, DollarSign, Trash2, ArrowRight, BookOpen } from 'lucide-react';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlans: SavedPlan[];
  onSelectPlan: (plan: SavedPlan) => void;
  onDeletePlan: (id: string) => void;
  onClearAll: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  isOpen,
  onClose,
  savedPlans,
  onSelectPlan,
  onDeletePlan,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col transition-colors duration-200">
          
          {/* Header Panel */}
          <div className="px-5 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-orange-500" />
              <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">Meal Plan History</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List panel */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {savedPlans.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <ChefHat className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto" />
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">No saved plans yet</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 max-w-[240px] mx-auto">Generate a plan using our AI planner and it will be preserved here automatically!</p>
              </div>
            ) : (
              savedPlans.map((saved) => (
                <div 
                  key={saved.id}
                  className="group relative p-4 rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-850 hover:border-orange-200 dark:hover:border-orange-900 hover:shadow-sm transition text-left"
                >
                  <div className="space-y-3">
                    {/* Date badge and Headcount metadata */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-gray-400 dark:text-gray-500">
                        <Calendar className="h-3 w-3" /> {saved.date}
                      </span>
                      
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-450">
                        <span className="flex items-center gap-0.5"><Users className="h-3 w-3 text-gray-400" /> {saved.input.numPeople}</span>
                        <span className="flex items-center gap-0.5"><DollarSign className="h-3 w-3 text-gray-400" /> {saved.input.budget} max</span>
                      </div>
                    </div>

                    {/* Meal names overview list */}
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                        B: {saved.plan.meals.breakfast.dishName}
                      </p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                        L: {saved.plan.meals.lunch.dishName}
                      </p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                        D: {saved.plan.meals.dinner.dishName}
                      </p>
                    </div>

                    {/* Action button toggler */}
                    <div className="pt-2 border-t border-gray-50 dark:border-gray-800/60 flex items-center justify-between">
                      <button
                        onClick={() => {
                          onSelectPlan(saved);
                          onClose();
                        }}
                        className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1.5 transition"
                      >
                        Load Recipe Blueprint <ArrowRight className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => onDeletePlan(saved.id)}
                        className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition"
                        title="Delete plan"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer controls */}
          {savedPlans.length > 0 && (
            <div className="p-5 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/30">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete all saved meal plans? This action cannot be undone.')) {
                    onClearAll();
                  }
                }}
                className="w-full py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-bold transition text-center"
              >
                Clear Plan History Log
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
