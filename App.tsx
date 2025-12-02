
import React, { useState, useEffect } from 'react';
import { View, FreelancerProfile, AnalysisData, RoadmapStep, Notification, UserRole } from './types';
import { analyzeProfileWithGemini, generateRoadmapWithGemini } from './services/geminiService';
import { INITIAL_ROADMAP } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import Roadmap from './components/Roadmap';
import Mentors from './components/Mentors';
import Insights from './components/Insights';
import PortfolioBuilder from './components/PortfolioBuilder';
import ProposalGenerator from './components/ProposalGenerator';
import Community from './components/Community';
import LandingPage from './components/LandingPage';
import Breadcrumbs from './components/Breadcrumbs';
import ThemeToggle from './components/ThemeToggle';
import Pricing from './components/Pricing';
import Profile from './components/Profile';
import Checkout from './components/Checkout';
import MentorDashboard from './components/MentorDashboard';
import MentorClients from './components/MentorClients';
import ChatSystem from './components/ChatSystem';
import { Bell, Search, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.FREELANCER);
  const [profile, setProfile] = useState<FreelancerProfile | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>(INITIAL_ROADMAP);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Analysis Complete', message: 'Your profile baseline score is ready.', time: '2m ago', read: false, type: 'success' },
    { id: '2', title: 'New Job Match', message: 'A React project matching your skills was posted.', time: '1h ago', read: false, type: 'info' },
    { id: '3', title: 'Badge Earned', message: 'You earned the "Early Adopter" badge!', time: '2h ago', read: true, type: 'success' }
  ]);
  const [gamification, setGamification] = useState({
    xp: 240,
    level: 3,
    streak: 5,
    badges: ['Early Adopter']
  });

  // Load theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  const handleOnboardingComplete = async (data: FreelancerProfile) => {
    setLoading(true);
    setProfile(data);
    try {
      const result = await analyzeProfileWithGemini(data);
      setAnalysis(result);
      
      // If we have gaps, generate a roadmap
      if (result.skillGaps.length > 0) {
        const aiRoadmap = await generateRoadmapWithGemini(data, result.skillGaps);
        if (aiRoadmap.length > 0) {
            setRoadmap(aiRoadmap);
        }
      }
      setCurrentView(View.DASHBOARD);
      addNotification({
        id: Date.now().toString(),
        title: 'Welcome Aboard',
        message: 'Your profile setup is complete. Check your dashboard!',
        time: 'Just now',
        read: false,
        type: 'success'
      });
    } catch (e) {
      console.error(e);
      // In a real app, show error toast
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatedLogin = () => {
    setUserRole(UserRole.FREELANCER);
    // Mock login data
    const mockProfile: FreelancerProfile = {
      name: "Alex Rivera",
      title: "Senior Frontend Engineer",
      bio: "Passionate developer focusing on React and scalable systems.",
      skills: ["React", "TypeScript", "Node.js", "Tailwind"],
      experienceYears: 5,
      hourlyRate: 85,
      email: "alex.rivera@example.com",
      location: "San Francisco, CA",
      githubUsername: "alexrivera",
      portfolioUrl: "https://alexrivera.dev"
    };

    setProfile(mockProfile);
    // Trigger analysis in background for the mock profile to populate dashboard
    analyzeProfileWithGemini(mockProfile).then(setAnalysis);
    setCurrentView(View.DASHBOARD);
  };

  const handleMentorLogin = () => {
      setUserRole(UserRole.MENTOR);
      setProfile({
          name: "Elena Rostova",
          title: "Senior Product Mentor",
          bio: "Helping designers bridge the gap to code.",
          skills: ["UI/UX", "Mentorship", "React"],
          experienceYears: 10,
          hourlyRate: 150
      });
      setCurrentView(View.MENTOR_DASHBOARD);
  };

  const handleSignOut = () => {
    setCurrentView(View.LANDING);
    setProfile(null);
    setAnalysis(null);
    setIsPro(false);
    setUserRole(UserRole.FREELANCER);
  };

  const handleProUpgrade = () => {
    setIsPro(true);
    setCurrentView(View.DASHBOARD);
    addNotification({
      id: Date.now().toString(),
      title: 'Welcome to Pro!',
      message: 'You have successfully upgraded to FairFound Pro. All features unlocked.',
      time: 'Just now',
      read: false,
      type: 'success'
    });
  };

  const addNotification = (notif: Notification) => {
    setNotifications(prev => [notif, ...prev]);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const renderContent = () => {
    switch (currentView) {
      // FREELANCER VIEWS
      case View.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} isLoading={loading} />;
      case View.DASHBOARD:
        return <Dashboard analysis={analysis} gamification={gamification} isDark={isDark} onNavigate={setCurrentView} />;
      case View.ROADMAP:
        return <Roadmap steps={roadmap} />;
      case View.INSIGHTS:
        return analysis ? <Insights analysis={analysis} isPro={isPro} onUpgrade={() => setCurrentView(View.PRICING)} /> : <div>No analysis available</div>;
      case View.MENTORS:
        return <Mentors isPro={isPro} onUpgrade={() => setCurrentView(View.PRICING)}/>;
      case View.PORTFOLIO:
        return <PortfolioBuilder profile={profile} />;
      case View.PROPOSALS:
        return <ProposalGenerator profile={profile} />;
      case View.COMMUNITY:
        return <Community />;
      case View.PRICING:
        return <Pricing onUpgrade={() => setCurrentView(View.CHECKOUT)} isPro={isPro} onNavigate={setCurrentView} />;
      case View.CHECKOUT:
        return <Checkout onComplete={handleProUpgrade} onCancel={() => setCurrentView(View.PRICING)} />;
      case View.PROFILE:
        return <Profile profile={profile} onUpdate={setProfile} />;
      
      // MENTOR VIEWS
      case View.MENTOR_DASHBOARD:
          return <MentorDashboard onNavigate={setCurrentView} />;
      case View.MENTOR_CLIENTS:
          return <MentorClients />;
      case View.MENTOR_CHAT:
          return <ChatSystem currentUser={{id: 'me', name: profile?.name || 'Mentor'}} role={UserRole.MENTOR} />;
      case View.MENTOR_PROFILE:
          return <Profile profile={profile} onUpdate={setProfile} />;

      default:
        return <div className="p-8 dark:text-slate-400">Coming Soon</div>;
    }
  };

  // Full screen views (No Sidebar)
  if (currentView === View.LANDING) {
    return (
      <LandingPage 
        onStart={() => {
            setUserRole(UserRole.FREELANCER);
            setCurrentView(View.ONBOARDING);
        }} 
        onLogin={handleSimulatedLogin}
        onMentorLogin={handleMentorLogin}
        isDark={isDark} 
        toggleTheme={toggleTheme} 
      />
    );
  }

  if (currentView === View.ONBOARDING) {
    return renderContent();
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        onChangeView={(view) => {
            if (view === View.LANDING) {
                handleSignOut();
            } else {
                setCurrentView(view);
            }
        }} 
        isPro={isPro}
        userRole={userRole}
      />
      
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-4 z-10 transition-colors duration-300">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <Breadcrumbs currentView={currentView} onNavigate={setCurrentView} />
                <h1 className="text-xl font-bold text-slate-800 dark:text-white capitalize tracking-tight flex items-center gap-2">
                  {currentView.toLowerCase().replace('_', ' ').replace('mentor', '')}
                  {isPro && userRole === UserRole.FREELANCER && <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">PRO</span>}
                  {userRole === UserRole.MENTOR && <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">MENTOR</span>}
                </h1>
              </div>
              
              <div className="flex items-center gap-4 md:gap-6">
                <div className="hidden md:flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 w-64 transition-colors">
                  <Search size={16} className="text-slate-400 mr-2" />
                  <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200 w-full placeholder-slate-400 dark:placeholder-slate-500" />
                </div>

                <div className="flex items-center gap-3 relative">
                   <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                   
                   <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus:outline-none"
                   >
                      <Bell size={20} />
                      {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-slate-900"></span>
                      )}
                   </button>

                   {showNotifications && (
                     <div className="absolute top-12 right-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden">
                        <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                          <h4 className="font-bold text-sm text-slate-800 dark:text-white">Notifications</h4>
                          <button onClick={markAllRead} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Mark all read</button>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-4 text-center text-xs text-slate-500">No new notifications</div>
                          ) : (
                            notifications.map(notif => (
                              <div key={notif.id} className={`p-3 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${!notif.read ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
                                <div className="flex justify-between items-start mb-1">
                                  <span className={`text-sm font-semibold ${!notif.read ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-700 dark:text-slate-300'}`}>{notif.title}</span>
                                  <span className="text-[10px] text-slate-400">{notif.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{notif.message}</p>
                              </div>
                            ))
                          )}
                        </div>
                     </div>
                   )}
                   
                   {showNotifications && (
                     <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowNotifications(false)}></div>
                   )}
                   
                   <div 
                    className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800 cursor-pointer"
                    onClick={() => setCurrentView(userRole === UserRole.MENTOR ? View.MENTOR_PROFILE : View.PROFILE)}
                   >
                      <div className="text-right hidden md:block">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{profile?.name || 'Guest User'}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                              {userRole === UserRole.MENTOR ? 'Senior Mentor' : `Lvl ${gamification.level} Freelancer`}
                          </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm overflow-hidden">
                          {profile?.avatarUrl ? (
                            <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            profile?.name ? profile.name.charAt(0) : 'G'
                          )}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
