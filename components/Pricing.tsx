
import React, { useState } from 'react';
import { Check, Zap, Star, Shield, ArrowRight } from 'lucide-react';
import { View } from '../types';

interface PricingProps {
  onUpgrade: () => void;
  isPro: boolean;
  onNavigate: (view: View) => void;
}

const Pricing: React.FC<PricingProps> = ({ onUpgrade, isPro, onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: 0,
      description: 'Perfect for freelancers just starting their optimization journey.',
      features: [
        'Basic Profile Analysis',
        '1 AI Roadmap Generation',
        'Limited Market Comparisons',
        'Access to Community Hub'
      ],
      cta: 'Current Plan',
      current: true,
      action: () => {}
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 29 : 24,
      description: 'For serious freelancers who want to rank in the top 1%.',
      features: [
        'Unlimited AI Analysis',
        'Dynamic Roadmap Updates',
        'Mentor Marketplace Access',
        'AI Portfolio Builder',
        'Proposal Generator (Unlimited)',
        'Weekly Progress Reports',
        'Detailed Salary Insights'
      ],
      cta: isPro ? 'Active Plan' : 'Upgrade to Pro',
      highlight: true,
      current: isPro,
      action: () => {
        if (!isPro) onUpgrade();
      }
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Invest in Your Career Growth</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Choose the plan that fits your ambition. Upgrade anytime as you grow.
        </p>

        <div className="flex items-center justify-center mt-8 gap-4">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-8 bg-indigo-600 rounded-full p-1 transition-colors relative"
          >
            <div className={`w-6 h-6 bg-white rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : ''}`}></div>
          </button>
          <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
            Yearly <span className="text-emerald-500 text-xs ml-1 font-bold">-20%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative rounded-2xl p-8 border ${
              plan.highlight 
                ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-xl shadow-indigo-200 dark:shadow-indigo-900/20 scale-105 z-10' 
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 opacity-90'
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Most Popular
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">{plan.description}</p>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">${plan.price}</span>
              <span className="text-slate-400 text-sm">/mo</span>
            </div>

            <button 
              onClick={plan.action}
              disabled={plan.current}
              className={`w-full py-3 rounded-xl font-semibold mb-8 transition-colors flex items-center justify-center gap-2 ${
                plan.highlight 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                  : plan.current
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-default'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {plan.cta} {plan.highlight && !plan.current && <ArrowRight size={16} />}
            </button>

            <ul className="space-y-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Check size={18} className="text-emerald-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl">
           <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
             <Shield size={24} />
           </div>
           <div>
             <h4 className="font-bold text-slate-900 dark:text-white mb-2">Money-Back Guarantee</h4>
             <p className="text-sm text-slate-500 dark:text-slate-400">Not satisfied with your growth? Get a full refund within 14 days.</p>
           </div>
        </div>
        <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl">
           <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
             <Star size={24} />
           </div>
           <div>
             <h4 className="font-bold text-slate-900 dark:text-white mb-2">Verified Mentors</h4>
             <p className="text-sm text-slate-500 dark:text-slate-400">All Pro mentors are vetted industry experts from top tech companies.</p>
           </div>
        </div>
        <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl">
           <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
             <Zap size={24} />
           </div>
           <div>
             <h4 className="font-bold text-slate-900 dark:text-white mb-2">Instant Cancellation</h4>
             <p className="text-sm text-slate-500 dark:text-slate-400">No long-term contracts. Cancel your subscription at any time.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
