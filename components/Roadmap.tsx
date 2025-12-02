
import React from 'react';
import { RoadmapStep } from '../types';
import { CheckCircle2, Circle, Clock, ArrowRight, Code, PenTool, Layout } from 'lucide-react';

interface RoadmapProps {
  steps: RoadmapStep[];
}

const Roadmap: React.FC<RoadmapProps> = ({ steps }) => {
  const getIcon = (type: RoadmapStep['type']) => {
    switch (type) {
        case 'skill': return <Code size={18} />;
        case 'branding': return <Layout size={18} />;
        case 'project': return <PenTool size={18} />;
        default: return <Circle size={18} />;
    }
  };

  const getStatusColor = (status: RoadmapStep['status']) => {
      switch(status) {
          case 'completed': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'in-progress': return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
          default: return 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700';
      }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your Personalized Growth Path</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            This roadmap is AI-generated based on your gap analysis. Completing these steps will improve your Global Readiness Score.
        </p>
      </div>

      <div className="relative">
        {/* Connector Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -ml-[1px]"></div>

        <div className="space-y-12">
            {steps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                    <div key={step.id} className={`relative flex items-center md:justify-between ${isEven ? 'flex-row-reverse' : ''}`}>
                        
                        {/* Empty Space for layout balance on desktop */}
                        <div className="hidden md:block w-5/12"></div>

                        {/* Center Node */}
                        <div className="absolute left-8 md:left-1/2 -ml-4 md:-ml-5 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-50 dark:border-slate-800 shadow-sm flex items-center justify-center z-10 transition-colors">
                            <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${step.status === 'completed' ? 'bg-emerald-500' : step.status === 'in-progress' ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                        </div>

                        {/* Card */}
                        <div className="ml-20 md:ml-0 w-full md:w-5/12">
                            <div className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border transition-all hover:shadow-lg group ${step.status === 'in-progress' ? 'border-indigo-200 dark:border-indigo-800 shadow-md ring-1 ring-indigo-50 dark:ring-indigo-900/20' : 'border-slate-100 dark:border-slate-800 shadow-sm'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(step.status)}`}>
                                        {step.status === 'completed' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                                        {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded border border-slate-100 dark:border-slate-700">
                                        {step.duration}
                                    </span>
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                                    {step.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 text-xs font-medium uppercase tracking-wide">
                                        {getIcon(step.type)}
                                        {step.type}
                                    </div>
                                    <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-all group-hover:gap-2">
                                        Start Task <ArrowRight size={16}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
