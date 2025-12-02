
import React, { useState } from 'react';
import { MOCK_MENTORS } from '../constants';
import { Star, MessageCircle, CheckCircle, Lock, UserPlus, X } from 'lucide-react';
import { Mentor } from '../types';

interface MentorsProps {
    isPro?: boolean;
    onUpgrade?: () => void;
}

const Mentors: React.FC<MentorsProps> = ({ isPro = false, onUpgrade }) => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1: Confirm, 2: Success

  const handleConnectClick = (mentor: Mentor) => {
      setSelectedMentor(mentor);
      setShowBookingModal(true);
      setBookingStep(1);
  };

  const handleConfirmConnection = () => {
      // Save connection to local storage to simulate backend
      const newConnection = {
          mentorId: selectedMentor?.id,
          menteeName: 'Alex Rivera',
          date: new Date().toISOString(),
          status: 'active'
      };
      
      const existing = JSON.parse(localStorage.getItem('fairfound_connections') || '[]');
      localStorage.setItem('fairfound_connections', JSON.stringify([...existing, newConnection]));

      setBookingStep(2); // Success state
      setTimeout(() => {
          setShowBookingModal(false);
          setSelectedMentor(null);
      }, 2000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-end mb-8">
        <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Expert Mentors</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Connect with industry leaders to accelerate your growth.</p>
        </div>
        <div className="flex gap-2">
            <select className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors">
                <option>All Specialties</option>
                <option>React</option>
                <option>Design</option>
                <option>Career</option>
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MENTORS.map((mentor) => (
            <div key={mentor.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                {!isPro && (
                   <div className="absolute top-4 right-4 z-10">
                       <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full text-slate-400" title="Pro Feature">
                           <Lock size={14} />
                       </div>
                   </div>
                )}
                
                <div className="flex items-start gap-4 mb-4">
                    <img src={mentor.imageUrl} alt={mentor.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700" />
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{mentor.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{mentor.role}</p>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">{mentor.company}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {mentor.specialties.map(spec => (
                        <span key={spec} className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded border border-slate-100 dark:border-slate-700">
                            {spec}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between py-4 border-t border-b border-slate-50 dark:border-slate-800 mb-6">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{mentor.rating}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">(42 reviews)</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                        ${mentor.rate}<span className="text-slate-400 dark:text-slate-500 font-normal">/hr</span>
                    </div>
                </div>

                <button 
                    onClick={() => isPro ? handleConnectClick(mentor) : onUpgrade?.()}
                    className={`w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        isPro 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                >
                    {isPro ? <><UserPlus size={18} /> Connect with Mentor</> : <><Lock size={14}/> Unlock Mentorship</>}
                </button>
            </div>
        ))}

        {/* CTA Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 flex flex-col justify-center text-center text-white border border-slate-700">
            <h3 className="text-xl font-bold mb-3">Become a Mentor</h3>
            <p className="text-slate-400 text-sm mb-6">
                Are you a senior freelancer? Share your knowledge and earn extra income.
            </p>
            <button className="bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                Apply Now
            </button>
        </div>
      </div>

      {/* Connection Modal */}
      {showBookingModal && selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                      <h3 className="font-bold text-slate-900 dark:text-white">Connect with {selectedMentor.name.split(' ')[0]}</h3>
                      <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                  </div>
                  
                  <div className="p-6">
                      {bookingStep === 1 && (
                          <div className="space-y-6">
                              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl flex items-start gap-3">
                                  <MessageCircle className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-1" size={20} />
                                  <div>
                                      <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">Mentorship Request</p>
                                      <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
                                          You are asking to connect with {selectedMentor.name}. If accepted, they will be added to your network and you can start scheduling sessions.
                                      </p>
                                  </div>
                              </div>
                              
                              <div className="text-center">
                                  <p className="text-sm text-slate-500 mb-4">
                                      Rate: <span className="font-bold text-slate-900 dark:text-white">${selectedMentor.rate}/hr</span>
                                  </p>
                                  <button onClick={handleConfirmConnection} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                                      Send Request
                                  </button>
                                  <button onClick={() => setShowBookingModal(false)} className="w-full mt-3 py-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-medium">
                                      Cancel
                                  </button>
                              </div>
                          </div>
                      )}

                      {bookingStep === 2 && (
                          <div className="text-center py-6">
                              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                  <CheckCircle size={32} />
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request Accepted!</h3>
                              <p className="text-sm text-slate-500 mb-6">
                                  {selectedMentor.name} has auto-accepted your request (Demo Mode). You can now view them in your network.
                              </p>
                              <p className="text-xs text-slate-400">Redirecting...</p>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Mentors;
