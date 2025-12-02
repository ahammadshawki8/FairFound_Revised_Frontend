
import React, { useEffect, useState } from 'react';
import { View } from '../types';
import { Users, Calendar, DollarSign, CheckCircle2, TrendingUp, Bell } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MentorDashboardProps {
    onNavigate: (view: View) => void;
}

const MentorDashboard: React.FC<MentorDashboardProps> = ({ onNavigate }) => {
  const [activeMenteesCount, setActiveMenteesCount] = useState(12);
  const [newConnections, setNewConnections] = useState<any[]>([]);

  useEffect(() => {
      // Check for new connections from local storage
      const connections = JSON.parse(localStorage.getItem('fairfound_connections') || '[]');
      if (connections.length > 0) {
          setActiveMenteesCount(12 + connections.length);
          setNewConnections(connections);
      }
  }, []);

  const earningsData = [
    { name: 'Week 1', value: 450 },
    { name: 'Week 2', value: 720 },
    { name: 'Week 3', value: 680 },
    { name: 'Week 4', value: 1200 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Mentor Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Welcome back, Elena. Here is your daily overview.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            + New Session Slot
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Mentees</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{activeMenteesCount}</h3>
                </div>
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Users size={24} />
                </div>
            </div>
            <p className="mt-4 text-sm text-emerald-600 flex items-center gap-1">
                <TrendingUp size={14} /> +{newConnections.length > 0 ? newConnections.length + 2 : 2} this week
            </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Reviews</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">5</h3>
                </div>
                <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                    <CheckCircle2 size={24} />
                </div>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Needs attention
            </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming Sessions</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">4</h3>
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <Calendar size={24} />
                </div>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Next: Today, 2:00 PM
            </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Earnings</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">$3,050</h3>
                </div>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <DollarSign size={24} />
                </div>
            </div>
            <p className="mt-4 text-sm text-emerald-600 flex items-center gap-1">
                 +$450 this week
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Earnings Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
             <h3 className="font-bold text-slate-900 dark:text-white mb-6">Earnings Overview</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsData}>
                        <defs>
                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
                        <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                 <Bell size={18} className="text-indigo-600" /> Recent Activity
              </h3>
              <div className="space-y-4">
                  {newConnections.map((conn, i) => (
                      <div key={`new-${i}`} className="flex gap-3 items-start pb-4 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0 bg-indigo-50/50 dark:bg-indigo-900/10 p-2 rounded-lg -mx-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400">
                             <CheckCircle2 size={16} />
                          </div>
                          <div>
                              <p className="text-sm text-slate-800 dark:text-slate-200">
                                New mentee connected: <span className="font-bold">{conn.menteeName}</span>
                              </p>
                              <span className="text-xs text-slate-400 mt-1 block">Just now</span>
                          </div>
                      </div>
                  ))}
                  
                  {[1,2,3,4].map((i) => (
                      <div key={i} className="flex gap-3 items-start pb-4 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                             <img src={`https://picsum.photos/100/100?random=${i+10}`} className="w-full h-full rounded-full object-cover" alt="User"/>
                          </div>
                          <div>
                              <p className="text-sm text-slate-800 dark:text-slate-200">
                                <span className="font-bold">Alex Rivera</span> submitted a task: <span className="italic text-slate-500 dark:text-slate-400">React Components</span>
                              </p>
                              <span className="text-xs text-slate-400 mt-1 block">2 hours ago</span>
                          </div>
                      </div>
                  ))}
              </div>
              <button 
                onClick={() => onNavigate(View.MENTOR_CLIENTS)}
                className="w-full mt-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                  View All Activity
              </button>
          </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
