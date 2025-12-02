
import React, { useState, useEffect } from 'react';
import { Mentee, Task, RoadmapStep } from '../types';
import { generateMenteeTasks } from '../services/geminiService';
import { Search, MoreHorizontal, Plus, ChevronRight, MessageCircle, FileText, CheckCircle, Clock, Sparkles, Layout, Code, PenTool, X, Trash2, Users } from 'lucide-react';

const MOCK_MENTEES: Mentee[] = [
    {
        id: '1',
        name: 'Alex Rivera',
        title: 'Frontend Developer',
        avatarUrl: 'https://picsum.photos/200/200?random=12',
        progress: 65,
        nextSession: 'Oct 24, 2:00 PM',
        status: 'active',
        roadmap: [
            { id: 'r1', title: 'Master React Hooks', description: 'Deep dive into useEffect and useMemo', duration: '1 week', status: 'completed', type: 'skill' },
            { id: 'r2', title: 'Build Portfolio', description: 'Create personal site', duration: '2 weeks', status: 'in-progress', type: 'project' }
        ],
        tasks: [
            { id: 't1', title: 'Refactor Todo App', description: 'Use Redux Toolkit', dueDate: 'Oct 25', status: 'pending' },
            { id: 't2', title: 'Read "Clean Code"', description: 'Chapter 1-3', dueDate: 'Oct 28', status: 'pending' }
        ]
    },
    {
        id: '2',
        name: 'Sarah Jenkins',
        title: 'UX Designer',
        avatarUrl: 'https://picsum.photos/200/200?random=13',
        progress: 40,
        nextSession: 'Oct 26, 10:00 AM',
        status: 'active',
        roadmap: [],
        tasks: []
    }
];

const MentorClients: React.FC = () => {
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'tasks'>('overview');
  const [mentees, setMentees] = useState<Mentee[]>(MOCK_MENTEES);
  
  // Task Generation State
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Load new connections from local storage
    const connections = JSON.parse(localStorage.getItem('fairfound_connections') || '[]');
    if (connections.length > 0) {
        const newMentees = connections.map((conn: any, index: number) => ({
            id: `new-${index}`,
            name: conn.menteeName,
            title: 'Senior Frontend Engineer', // Mock title from current user
            avatarUrl: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=6366f1&color=fff',
            progress: 0,
            nextSession: 'Not Scheduled',
            status: 'active',
            roadmap: [],
            tasks: []
        }));
        
        // Filter out duplicates if logic requires, but for demo just append unique
        // For simplicity, we just add them to the mock list if not present
        // (In a real app, IDs would be unique)
        setMentees(prev => [...prev, ...newMentees]);
    }
  }, []);

  const handleGenerateTasks = async () => {
      if (!selectedMentee) return;
      setIsGenerating(true);
      try {
          const newTasks = await generateMenteeTasks(selectedMentee.name, selectedMentee.title, "Intermediate");
          const updatedMentee = {
              ...selectedMentee,
              tasks: [...selectedMentee.tasks, ...newTasks]
          };
          updateMenteeState(updatedMentee);
      } catch (e) {
          console.error(e);
      } finally {
          setIsGenerating(false);
      }
  };

  const updateMenteeState = (updated: Mentee) => {
      setMentees(prev => prev.map(m => m.id === updated.id ? updated : m));
      setSelectedMentee(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
      e.preventDefault();
      // Logic for manual task add would go here (omitted for brevity)
  };

  const handleDeleteTask = (taskId: string) => {
      if (!selectedMentee) return;
      const updated = {
          ...selectedMentee,
          tasks: selectedMentee.tasks.filter(t => t.id !== taskId)
      };
      updateMenteeState(updated);
  };

  return (
    <div className="h-full flex bg-slate-50 dark:bg-slate-950">
        {/* Sidebar List */}
        <div className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">My Mentees</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search students..." 
                        className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {mentees.map(mentee => (
                    <div 
                        key={mentee.id}
                        onClick={() => setSelectedMentee(mentee)}
                        className={`p-4 border-b border-slate-50 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${selectedMentee?.id === mentee.id ? 'bg-indigo-50 dark:bg-indigo-900/10 border-l-4 border-l-indigo-600' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <img src={mentee.avatarUrl} alt={mentee.name} className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-900 dark:text-white truncate">{mentee.name}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{mentee.title}</p>
                            </div>
                            <ChevronRight size={16} className="text-slate-400" />
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs">
                            <span className={`px-2 py-0.5 rounded-full ${mentee.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                {mentee.status}
                            </span>
                            <span className="text-slate-500">Progress: {mentee.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
            {selectedMentee ? (
                <>
                    {/* Header */}
                    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img src={selectedMentee.avatarUrl} alt={selectedMentee.name} className="w-16 h-16 rounded-full object-cover border-4 border-slate-50 dark:border-slate-800" />
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedMentee.name}</h2>
                                <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    {selectedMentee.title} • Next Session: <span className="text-indigo-600 dark:text-indigo-400 font-medium">{selectedMentee.nextSession}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                View Profile
                            </button>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                                <MessageCircle size={18} /> Message
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6">
                        <div className="flex gap-8">
                            {['overview', 'roadmap', 'tasks'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`py-4 text-sm font-medium border-b-2 transition-colors capitalize ${
                                        activeTab === tab 
                                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
                                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto p-8">
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Recent Activity</h3>
                                    <p className="text-slate-500 text-sm">No recent activity logged.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Notes</h3>
                                    <textarea className="w-full h-32 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-none resize-none text-sm" placeholder="Add private notes about this mentee..."></textarea>
                                </div>
                            </div>
                        )}

                        {activeTab === 'roadmap' && (
                             <div className="max-w-3xl">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Current Roadmap</h3>
                                    <button className="text-sm text-indigo-600 font-medium hover:underline">+ Add Step</button>
                                </div>
                                <div className="space-y-4">
                                    {selectedMentee.roadmap.length === 0 ? (
                                        <p className="text-slate-500 italic">No roadmap assigned yet.</p>
                                    ) : (
                                        selectedMentee.roadmap.map((step, idx) => (
                                            <div key={step.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                                                <div className="mt-1">
                                                    {step.status === 'completed' ? <CheckCircle className="text-emerald-500" size={20}/> : <Clock className="text-slate-400" size={20}/>}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <h4 className="font-bold text-slate-900 dark:text-white">{step.title}</h4>
                                                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">{step.duration}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-500 mt-1">{step.description}</p>
                                                </div>
                                                <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
                                            </div>
                                        ))
                                    )}
                                </div>
                             </div>
                        )}

                        {activeTab === 'tasks' && (
                             <div className="max-w-3xl">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Assigned Tasks</h3>
                                        <p className="text-sm text-slate-500">Manage assignments and review work.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={handleGenerateTasks}
                                            disabled={isGenerating}
                                            className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors flex items-center gap-2"
                                        >
                                            {isGenerating ? <Sparkles size={16} className="animate-spin"/> : <Sparkles size={16}/>}
                                            AI Generate
                                        </button>
                                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                                            <Plus size={16} /> New Task
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {selectedMentee.tasks.length === 0 ? (
                                        <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                                            <p className="text-slate-500">No active tasks.</p>
                                            <button onClick={handleGenerateTasks} className="text-indigo-600 font-medium mt-2 hover:underline">Generate some with AI</button>
                                        </div>
                                    ) : (
                                        selectedMentee.tasks.map(task => (
                                            <div key={task.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 transition-colors group">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-start gap-3">
                                                        <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.status === 'completed' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'}`}>
                                                            {task.status === 'completed' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-slate-900 dark:text-white">{task.title}</h4>
                                                            <p className="text-sm text-slate-500 mt-1">{task.description}</p>
                                                            <div className="flex items-center gap-4 mt-3">
                                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                                    <Clock size={12}/> Due {task.dueDate}
                                                                </span>
                                                                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                                                                    task.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                                                                }`}>
                                                                    {task.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => handleDeleteTask(task.id)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                             </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                    <Users size={64} className="mb-4 text-slate-300 dark:text-slate-700" />
                    <p className="text-lg font-medium text-slate-500 dark:text-slate-400">Select a mentee to manage</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default MentorClients;
