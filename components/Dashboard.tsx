
import React from 'react';
import { AnalysisData, GamificationState, View } from '../types';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { Trophy, TrendingUp, Target, DollarSign, Activity, Star, FileText, CheckCircle2 } from 'lucide-react';

interface DashboardProps {
  analysis: AnalysisData | null;
  gamification: GamificationState;
  isDark: boolean;
  onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ analysis, gamification, isDark, onNavigate }) => {
  if (!analysis) return <div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading analysis...</div>;

  const radarData = [
    { subject: 'Portfolio', A: analysis.metrics.portfolioScore, fullMark: 100 },
    { subject: 'GitHub', A: analysis.metrics.githubScore, fullMark: 100 },
    { subject: 'Comm.', A: analysis.metrics.communicationScore, fullMark: 100 },
    { subject: 'Tech Stack', A: analysis.metrics.techStackScore, fullMark: 100 },
    { subject: 'Market Fit', A: analysis.marketPercentile, fullMark: 100 },
  ];

  // Mock historical data for graph
  const growthData = [
    { name: 'Week 1', score: 40 },
    { name: 'Week 2', score: 55 },
    { name: 'Week 3', score: 65 },
    { name: 'Week 4', score: analysis.globalReadinessScore },
  ];

  const chartTextColor = isDark ? '#94a3b8' : '#64748b';
  const chartGridColor = isDark ? '#1e293b' : '#f1f5f9';
  const radarGridColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Global Readiness</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{analysis.globalReadinessScore}/100</h3>
                </div>
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Trophy size={24} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                <TrendingUp size={16} className="mr-1" />
                <span>Top {100 - analysis.marketPercentile}% of peers</span>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Market Rate</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">${analysis.pricingSuggestion.recommended}/hr</h3>
                </div>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <DollarSign size={24} />
                </div>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Potential +${Math.round(analysis.pricingSuggestion.recommended - analysis.pricingSuggestion.current)} increase
            </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Level</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">Lvl {gamification.level}</h3>
                </div>
                <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                    <Star size={24} />
                </div>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-4">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 text-right">{gamification.xp} XP / Next Lvl</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Activity Streak</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{gamification.streak} Days</h3>
                </div>
                <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded-lg text-rose-600 dark:text-rose-400">
                    <Activity size={24} />
                </div>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Keep it up to earn the Fire Badge!</p>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Chart - Skill Analysis */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm lg:col-span-1">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Target size={20} className="text-indigo-500 dark:text-indigo-400"/>
                Competency Matrix
            </h3>
            <div className="h-[300px] w-full flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke={radarGridColor} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: chartTextColor, fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="You"
                            dataKey="A"
                            stroke="#6366f1"
                            strokeWidth={2}
                            fill="#6366f1"
                            fillOpacity={isDark ? 0.3 : 0.4}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: '8px', 
                            border: 'none', 
                            backgroundColor: isDark ? '#1e293b' : '#fff',
                            color: isDark ? '#fff' : '#0f172a',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                          }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Line Chart - Growth */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <TrendingUp size={20} className="text-emerald-500 dark:text-emerald-400"/>
                    Growth Trajectory
                </h3>
                <select className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1 text-slate-600 dark:text-slate-300 outline-none">
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                </select>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={growthData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: chartTextColor, fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: chartTextColor, fontSize: 12}} />
                        <Tooltip 
                             contentStyle={{ 
                                borderRadius: '8px', 
                                border: 'none', 
                                backgroundColor: isDark ? '#1e293b' : '#fff',
                                color: isDark ? '#fff' : '#0f172a',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                             }}
                        />
                        <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

       {/* Weekly Report Card */}
       <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-slate-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <FileText size={32} className="text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Weekly Report Card</h3>
                    <p className="text-indigo-200 text-sm">Your performance summary for Oct 12 - Oct 19</p>
                </div>
            </div>
            
            <div className="flex gap-6">
                <div className="text-center">
                    <p className="text-indigo-200 text-xs uppercase font-semibold">Skills Improved</p>
                    <p className="text-2xl font-bold">+3</p>
                </div>
                <div className="text-center">
                    <p className="text-indigo-200 text-xs uppercase font-semibold">Profile Views</p>
                    <p className="text-2xl font-bold">142</p>
                </div>
                <div className="text-center">
                    <p className="text-indigo-200 text-xs uppercase font-semibold">Rank Change</p>
                    <div className="text-2xl font-bold flex items-center justify-center gap-1 text-emerald-300">
                        <TrendingUp size={16} /> +5%
                    </div>
                </div>
            </div>

            <button 
                onClick={() => onNavigate(View.INSIGHTS)}
                className="bg-white text-indigo-700 dark:bg-slate-800 dark:text-indigo-300 px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors shadow-sm border border-transparent dark:border-slate-700"
            >
                View Full Report
            </button>
        </div>
      </div>

      {/* Quick Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                    <Target size={18} className="text-indigo-500 dark:text-indigo-400" />
                    Priority Skill Gap: {analysis.skillGaps[0]}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                   Based on recent job postings in your niche, mastering this skill could increase your profile visibility by 35%.
                </p>
                <button 
                  onClick={() => onNavigate(View.ROADMAP)}
                  className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1"
                >
                    Add to Roadmap <TrendingUp size={14} />
                </button>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
             <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-500 dark:text-emerald-400" />
                Immediate Actions
             </h3>
             <ul className="space-y-3">
                {analysis.weaknesses.slice(0, 3).map((weakness, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        {weakness}
                    </li>
                ))}
             </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
