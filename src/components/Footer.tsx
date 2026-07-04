import React from 'react';
import { ChefHat, Mail, Github, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900/50 py-12 px-4 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo Brand Footer */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm">
                <ChefHat className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                SmartChef <span className="text-orange-500">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              Plan smarter. Eat better. Waste less. SmartChef AI uses machine learning to construct perfectly balanced, waste-reducing daily recipes customized exactly for your pantry staples and budget.
            </p>
          </div>

          {/* Links Section 1 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 font-mono">Product</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition">Features</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition">How It Works</a>
              </li>
              <li>
                <span className="text-gray-400 dark:text-gray-600 flex items-center gap-1">Pricing <span className="text-[10px] font-mono px-1 bg-gray-100 dark:bg-gray-900 text-gray-400 rounded">Free MVP</span></span>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 font-mono">Get in Touch</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4 text-orange-400" />
                <a href="mailto:support@smartchef.ai" className="hover:text-orange-500 transition">hello@smartchef.ai</a>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Github className="h-4 w-4 text-orange-400" />
                <span className="hover:text-orange-500 cursor-pointer">GitHub Community</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} SmartChef AI. All rights reserved. Made for smart culinary creators.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3.5 w-3.5 text-red-500 fill-current" /> for healthy food preservation.
          </p>
        </div>
      </div>
    </footer>
  );
};
