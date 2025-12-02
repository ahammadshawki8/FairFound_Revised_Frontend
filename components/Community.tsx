
import React from 'react';
import { Trophy, Users, Flame, Target, ArrowUp } from 'lucide-react';

const Community: React.FC = () => {
  const leaderboard = [
    { rank: 1, name: "Sarah J.", role: "React Dev", xp: 12500, avatar: "bg-indigo-500" },
    { rank: 2, name: "Mike R.", role: "UX Designer", xp: 11200, avatar: "bg-rose-500" },
    { rank: 3, name: "Alex P.", role: "Fullstack", xp: 10800, avatar: "bg-emerald-500" },
    { rank: 4, name: "You", role: "Frontend", xp: 8400, avatar: "bg-slate-800", isMe: true },
    { rank: 5, name: "Lisa M.", role: "Copywriter", xp: 8100, avatar: "bg-amber-500" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Community Hub</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Compete with peers, join challenges, and grow together.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content / Challenges */}
        <div className="lg:col-span-2 space-y-8">
             {/* Active Challenge */}
             <div className="bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Flame size={14} /> Weekly Challenge
                    </div>
                    <h3 className="text-3xl font-bold mb-4">The "5-Day Commit" Streak</h3>
                    <p className="text-indigo-100 max-w-lg mb-8 text-lg">
                        Push code to GitHub for 5 consecutive days to earn the "Consistent Coder" badge and 500 XP.
                    </p>
                    <div className="flex items-center gap-4">
                        <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                            Join Challenge
                        </button>
                        <span className="text-sm font-medium text-indigo-200">1,204 freelancers joined</span>
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/10 to-transparent transform skew-x-12"></div>
             </div>

            {/* Peer Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-colors">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Users size={20} className="text-emerald-500"/> React Developers
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                        Join 450+ developers sharing tips on React 19, RSC, and performance.
                    </p>
                    <div className="flex items-center justify-between">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800"></div>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 font-bold">+400</div>
                         </div>
                         <button className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">Enter Room</button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-colors">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Target size={20} className="text-rose-500"/> Pricing Strategy
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                        Discuss negotiation tactics and rate setting with senior freelancers.
                    </p>
                    <div className="flex items-center justify-between">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800"></div>
                            ))}
                         </div>
                         <button className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">Enter Room</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full transition-colors">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Trophy className="text-amber-500" />
                    Top Performers
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">This week's most active freelancers</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
                {leaderboard.map((user, index) => (
                    <div 
                        key={index} 
                        className={`flex items-center gap-4 p-4 rounded-xl mb-2 transition-colors ${
                            user.isMe 
                            ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800' 
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    >
                        <span className={`font-bold w-6 text-center ${index < 3 ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500'}`}>
                            #{user.rank}
                        </span>
                        
                        <div className={`w-10 h-10 rounded-full ${user.avatar} flex items-center justify-center text-white font-bold text-sm`}>
                            {user.name.charAt(0)}
                        </div>
                        
                        <div className="flex-1">
                            <h4 className={`text-sm font-bold ${user.isMe ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200'}`}>
                                {user.name} {user.isMe && '(You)'}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{user.role}</p>
                        </div>
                        
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{user.xp.toLocaleString()}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">XP</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                    View Global Rankings
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
