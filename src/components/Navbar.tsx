import React, { useState } from 'react';
import { ChefHat, History, Sun, Moon, Sparkles, Menu, X, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'planner' | 'results';
  setView: (view: 'landing' | 'planner' | 'results') => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setView,
  darkMode,
  toggleDarkMode,
  onOpenHistory,
  historyCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 dark:border-gray-800/80 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Brand */}
        <button 
          onClick={() => { setView('landing'); setMobileMenuOpen(false); }}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-all">
            <ChefHat className="h-6 w-6" />
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-1.5">
              SmartChef <span className="text-orange-500 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/50 dark:text-orange-400">AI</span>
            </span>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 -mt-1 font-mono">Zero-Waste Culinary Planner</p>
          </div>
        </button>

        {/* Desktop Nav Actions */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setView('landing')}
            className={`text-sm font-medium transition-colors ${
              currentView === 'landing'
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setView('planner')}
            className={`text-sm font-medium transition-colors ${
              currentView === 'planner'
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Meal Planner
          </button>
          {currentView === 'results' && (
            <button
              onClick={() => setView('results')}
              className="text-sm font-medium text-orange-600 dark:text-orange-400 flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4 animate-pulse" /> Active Plan
            </button>
          )}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/60 transition"
          >
            <History className="h-4 w-4" />
            <span>Saved Plans</span>
            {historyCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow animate-bounce">
                {historyCount}
              </span>
            )}
          </button>

          {/* Theme Toggler */}
          <button
            onClick={toggleDarkMode}
            className="rounded-xl border border-gray-200 dark:border-gray-700 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-500" />}
          </button>

          {/* CTA Primary Header Button */}
          {currentView !== 'planner' && currentView !== 'results' && (
            <button
              onClick={() => setView('planner')}
              className="flex items-center gap-1.5 rounded-xl bg-gray-900 dark:bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-800 dark:hover:bg-orange-600 transition"
            >
              Start Cooking <Sparkles className="h-4 w-4 text-orange-400 dark:text-white" />
            </button>
          )}
        </div>

        {/* Mobile Interface Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="rounded-xl border border-gray-200 dark:border-gray-700 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-500" />}
          </button>
          
          <button
            onClick={onOpenHistory}
            className="relative rounded-xl border border-gray-200 dark:border-gray-700 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <History className="h-5 w-5" />
            {historyCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white shadow">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-3 transition-all duration-200 shadow-xl">
          <button
            onClick={() => { setView('landing'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
              currentView === 'landing' ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            Home Landing
          </button>
          <button
            onClick={() => { setView('planner'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
              currentView === 'planner' ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            Meal Planner
          </button>
          {currentView === 'results' && (
            <button
              onClick={() => { setView('results'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 animate-pulse text-orange-500" /> Current Active Plan
            </button>
          )}

          {currentView !== 'planner' && currentView !== 'results' && (
            <button
              onClick={() => { setView('planner'); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-medium text-white shadow-md hover:bg-orange-600"
            >
              Create Meal Plan <Sparkles className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </header>
  );
};
