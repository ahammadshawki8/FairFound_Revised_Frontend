import React from 'react';
import { View } from '../types';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentView, onNavigate }) => {
  const getBreadcrumbLabel = (view: View) => {
    return view.charAt(0) + view.slice(1).toLowerCase().replace('_', ' ');
  };

  return (
    <nav className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-1">
      <button 
        onClick={() => onNavigate(View.DASHBOARD)}
        className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <Home size={14} className="mr-1" />
        Home
      </button>
      
      {currentView !== View.DASHBOARD && (
        <>
          <ChevronRight size={14} className="mx-2 text-slate-400 dark:text-slate-600" />
          <span className="font-medium text-slate-900 dark:text-slate-200">
            {getBreadcrumbLabel(currentView)}
          </span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;