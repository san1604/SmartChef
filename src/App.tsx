/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { PlannerPage } from './components/PlannerPage';
import { ResultPage } from './components/ResultPage';
import { HistorySidebar } from './components/HistorySidebar';
import { LoadingScreen } from './components/LoadingScreen';
import { ToastProvider, useToast } from './components/Toast';
import { MealPlanInput, SmartChefPlan, SavedPlan } from './types';

function SmartChefApp() {
  const { showToast } = useToast();
  
  // Navigation View
  const [currentView, setView] = useState<'landing' | 'planner' | 'results'>('landing');
  
  // AI Generation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePlan, setActivePlan] = useState<SmartChefPlan | null>(null);
  const [activeInput, setActiveInput] = useState<MealPlanInput | null>(null);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const localTheme = localStorage.getItem('smartchef_dark_mode');
    if (localTheme) {
      return localTheme === 'true';
    }
    // Default to dark mode for cooking eyes or preference
    return true;
  });

  // History State
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>(() => {
    try {
      const raw = localStorage.getItem('smartchef_saved_plans');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [historyOpen, setHistoryOpen] = useState(false);

  // Effect to apply dark mode class to html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('smartchef_dark_mode', String(darkMode));
  }, [darkMode]);

  // Sync saved plans to localStorage
  useEffect(() => {
    localStorage.setItem('smartchef_saved_plans', JSON.stringify(savedPlans));
  }, [savedPlans]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Generate cooking plan API call
  const generateMealPlan = async (inputData: MealPlanInput) => {
    setIsGenerating(true);
    setView('planner'); // Stay on planner page to show loading screen
    setActiveInput(inputData);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error(`Server returned error code: ${response.status}`);
      }

      const planResult: SmartChefPlan = await response.json();
      
      // Update active states
      setActivePlan(planResult);
      setView('results');
      showToast('Successfully built your custom zero-waste meal plan!', 'success');

      // Append to local history
      const newSaved: SavedPlan = {
        id: Math.random().toString(36).substring(2, 9),
        date: new Date().toLocaleDateString(undefined, { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        input: inputData,
        plan: planResult,
      };

      setSavedPlans((prev) => [newSaved, ...prev]);

    } catch (error: any) {
      console.error(error);
      showToast(error.message || 'Failed to generate meal plan. Please check your network connection.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Regenerate plan with same input
  const handleRegenerate = () => {
    if (activeInput) {
      generateMealPlan(activeInput);
    } else {
      showToast('No active planner profile found. Please fill out the form.', 'error');
    }
  };

  // History panel actions
  const handleSelectPlan = (saved: SavedPlan) => {
    setActiveInput(saved.input);
    setActivePlan(saved.plan);
    setView('results');
    showToast(`Loaded meal plan from ${saved.date}`, 'success');
  };

  const handleDeletePlan = (id: string) => {
    setSavedPlans((prev) => prev.filter((p) => p.id !== id));
    showToast('Meal plan deleted from history.', 'info');
  };

  const handleClearAllHistory = () => {
    setSavedPlans([]);
    showToast('Pantry history log cleared successfully.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-200">
      
      {/* Navbar Brand Header */}
      <Navbar
        currentView={currentView}
        setView={(view) => {
          if (view === 'results' && !activePlan) {
            showToast('No plan has been generated yet! Use the planner first.', 'info');
            return;
          }
          setView(view);
        }}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenHistory={() => setHistoryOpen(true)}
        historyCount={savedPlans.length}
      />

      {/* Main Routed Area */}
      <div className="flex-1">
        {isGenerating ? (
          <div className="py-20">
            <LoadingScreen />
          </div>
        ) : (
          <>
            {currentView === 'landing' && (
              <LandingPage onStartPlanning={() => setView('planner')} />
            )}

            {currentView === 'planner' && (
              <PlannerPage 
                onGenerate={generateMealPlan} 
                isGenerating={isGenerating} 
              />
            )}

            {currentView === 'results' && activePlan && (
              <ResultPage
                plan={activePlan}
                onBackToPlanner={() => setView('planner')}
                onRegenerate={handleRegenerate}
                isRegenerating={isGenerating}
              />
            )}
          </>
        )}
      </div>

      {/* Saved History Drawer overlay */}
      <HistorySidebar
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        savedPlans={savedPlans}
        onSelectPlan={handleSelectPlan}
        onDeletePlan={handleDeletePlan}
        onClearAll={handleClearAllHistory}
      />

      {/* Footer Details */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <SmartChefApp />
    </ToastProvider>
  );
}

