
import React, { useState } from 'react';
import { FreelancerProfile } from '../types';
import { Camera, Mail, MapPin, Link as LinkIcon, Save, Github } from 'lucide-react';

interface ProfileProps {
  profile: FreelancerProfile | null;
  onUpdate: (profile: FreelancerProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FreelancerProfile>(profile || {
    name: '',
    title: '',
    bio: '',
    skills: [],
    experienceYears: 0,
    hourlyRate: 0,
    email: 'user@example.com',
    location: 'Remote',
    githubUsername: '',
    portfolioUrl: ''
  });

  if (!profile) return <div>Loading...</div>;

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h2>
        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            isEditing 
            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          {isEditing ? <><Save size={18} /> Save Changes</> : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 p-1">
                <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-slate-500 overflow-hidden">
                    {formData.avatarUrl ? (
                         <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        formData.name.charAt(0)
                    )}
                </div>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
                  <Camera size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 px-8 pb-8">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{formData.name}</h3>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Professional Title</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-lg text-slate-700 dark:text-slate-300">{formData.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Bio</label>
                {isEditing ? (
                  <textarea 
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{formData.bio || 'No bio provided yet.'}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Hourly Rate ($)</label>
                    {isEditing ? (
                      <input 
                        type="number" 
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({...formData, hourlyRate: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">${formData.hourlyRate}/hr</p>
                    )}
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Experience (Years)</label>
                    {isEditing ? (
                      <input 
                        type="number" 
                        value={formData.experienceYears}
                        onChange={(e) => setFormData({...formData, experienceYears: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{formData.experienceYears} Years</p>
                    )}
                 </div>
               </div>

               <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Mail size={18} />
                    {isEditing ? (
                       <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="flex-1 px-3 py-1 rounded border border-slate-200 dark:border-slate-700 bg-transparent"
                      />
                    ) : (
                      <span>{formData.email}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <MapPin size={18} />
                    {isEditing ? (
                       <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="flex-1 px-3 py-1 rounded border border-slate-200 dark:border-slate-700 bg-transparent"
                      />
                    ) : (
                      <span>{formData.location}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Github size={18} />
                    {isEditing ? (
                       <input 
                        type="text" 
                        value={formData.githubUsername}
                        onChange={(e) => setFormData({...formData, githubUsername: e.target.value})}
                        className="flex-1 px-3 py-1 rounded border border-slate-200 dark:border-slate-700 bg-transparent"
                      />
                    ) : (
                      <span>{formData.githubUsername || 'Not connected'}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <LinkIcon size={18} />
                    {isEditing ? (
                       <input 
                        type="text" 
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})}
                        className="flex-1 px-3 py-1 rounded border border-slate-200 dark:border-slate-700 bg-transparent"
                      />
                    ) : (
                      <a href={formData.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 hover:underline text-indigo-600 dark:text-indigo-400">
                        {formData.portfolioUrl || 'No portfolio link'}
                      </a>
                    )}
                  </div>
               </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Skills</h4>
            <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium border border-indigo-100 dark:border-indigo-800">
                        {skill}
                    </span>
                ))}
                {isEditing && (
                    <button className="px-3 py-1 border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 rounded-full text-sm hover:border-indigo-500 hover:text-indigo-500 transition-colors">
                        + Add Skill
                    </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
