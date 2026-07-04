import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Scale, Clock, HeartHandshake, Smile, RefreshCw } from 'lucide-react';

interface LandingPageProps {
  onStartPlanning: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartPlanning }) => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-200">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-orange-100/60 dark:bg-orange-950/20 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-amber-100/50 dark:bg-amber-950/15 blur-3xl" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          
          {/* Badge Alert */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 px-4 py-1.5 text-xs font-semibold text-orange-700 dark:text-orange-300 border border-orange-100 dark:border-orange-900/40 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            <span>AI-Driven Zero-Waste Cooking Planner</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Stop wasting food. <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Start cooking smarter.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-sans font-normal">
            Input whatever is left in your fridge, set your daily budget, and let our Michelin-trained AI cook up an optimized 1-day meal plan. Minimize grocery runs, avoid waste, and eat beautifully.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartPlanning}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-orange-500 hover:bg-orange-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange-500/15 transition-all hover:translate-y-[-2px] cursor-pointer"
            >
              Generate Your Meal Plan <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto flex items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 transition-all cursor-pointer"
            >
              See How It Works
            </a>
          </div>

          {/* Statistics Strip */}
          <div className="pt-12 grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-800/80 max-w-2xl mx-auto text-center">
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Under 60s</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">Generation Time</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">100%</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">Custom Built</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">0%</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">Food Waste Goal</p>
            </div>
          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-gray-50 dark:border-gray-800/40">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Designed for Conscious, Creative Cooks
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Tackle inflation, reduce your environmental footprint, and master home-cooked meals easily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group relative rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-800/40 p-8 shadow-sm hover:shadow-md transition-all">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-all">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">Zero-Waste Engine</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              We coordinate ingredients across breakfast, lunch, and dinner. Bought a bunch of spinach? We'll utilize it smartly in multiple dishes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-800/40 p-8 shadow-sm hover:shadow-md transition-all">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-all">
              <Scale className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">Strict Budget Compliance</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Specify your maximum limit. Our AI estimates local ingredient costs and designs a grocery list guaranteed to stay within bounds.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-800/40 p-8 shadow-sm hover:shadow-md transition-all">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-all">
              <Flame className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">Adaptive Skill Grading</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Whether you are a beginner looking for 15-minute quick-fixes or an advanced cook craving rich, layered cuisines, recipes adjust seamlessly.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50/50 dark:bg-gray-900/30 py-16 sm:py-24 border-t border-b border-gray-100/70 dark:border-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest font-mono">Simple Workflow</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Get Your Custom Meal Blueprint in 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-gray-800 text-sm font-bold text-gray-900 dark:text-white shadow-sm border border-gray-100 dark:border-gray-700">
                1
              </div>
              <h3 className="font-display font-bold text-gray-950 dark:text-white text-base">Budget & Country</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Specify your budget limit, target country, and household headcount.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-gray-800 text-sm font-bold text-gray-900 dark:text-white shadow-sm border border-gray-100 dark:border-gray-700">
                2
              </div>
              <h3 className="font-display font-bold text-gray-950 dark:text-white text-base">Diets & Cooking Style</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Select dietary labels like Vegan, Keto, High-Protein, and favorite cuisines.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-gray-800 text-sm font-bold text-gray-900 dark:text-white shadow-sm border border-gray-100 dark:border-gray-700">
                3
              </div>
              <h3 className="font-display font-bold text-gray-950 dark:text-white text-base">Pantry Stock check</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Add chips for ingredients currently in your kitchen to prioritize using them first.</p>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-md">
                4
              </div>
              <h3 className="font-display font-bold text-gray-950 dark:text-white text-base">Enjoy Your Feast</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Review recipes, tick off interactive checklists, and download your grocery list.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
