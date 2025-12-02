
import React, { useState } from 'react';
import { Chat, ChatMessage } from '../types';
import { Send, MoreVertical, Search, Phone, Video } from 'lucide-react';

interface ChatSystemProps {
  currentUser: { id: string; name: string };
  role: 'FREELANCER' | 'MENTOR';
}

const MOCK_CHATS: Chat[] = [
    {
        id: '1',
        participant: { id: 'm1', name: 'Elena Rostova', avatarUrl: 'https://picsum.photos/200/200?random=1', role: 'Mentor' },
        lastMessage: 'Sure, let\'s review your portfolio tomorrow.',
        unreadCount: 2,
        messages: [
            { id: '1', senderId: 'm1', text: 'Hi! How is the roadmap going?', timestamp: '10:00 AM', isMe: false },
            { id: '2', senderId: 'me', text: 'Going well! I finished the React module.', timestamp: '10:05 AM', isMe: true },
            { id: '3', senderId: 'm1', text: 'That is great progress. Did you build the demo app?', timestamp: '10:07 AM', isMe: false },
            { id: '4', senderId: 'm1', text: 'Sure, let\'s review your portfolio tomorrow.', timestamp: '10:08 AM', isMe: false },
        ]
    },
    {
        id: '2',
        participant: { id: 'm2', name: 'Marcus Chen', avatarUrl: 'https://picsum.photos/200/200?random=2', role: 'Mentor' },
        lastMessage: 'Don\'t forget to push your code.',
        unreadCount: 0,
        messages: []
    }
];

const ChatSystem: React.FC<ChatSystemProps> = ({ currentUser, role }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(MOCK_CHATS[0]);
  const [inputText, setInputText] = useState('');
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChat) return;

    const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: 'me',
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
    };

    const updatedChats = chats.map(chat => {
        if (chat.id === selectedChat.id) {
            return {
                ...chat,
                messages: [...chat.messages, newMessage],
                lastMessage: inputText
            };
        }
        return chat;
    });

    setChats(updatedChats);
    setSelectedChat(prev => prev ? ({ ...prev, messages: [...prev.messages, newMessage] }) : null);
    setInputText('');
  };

  return (
    <div className="h-full flex bg-white dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl mx-4 my-4 shadow-sm">
      {/* Sidebar List */}
      <div className="w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50 dark:bg-slate-950">
         <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Messages</h2>
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search conversations..." 
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
                <div 
                    key={chat.id} 
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800 ${
                        selectedChat?.id === chat.id 
                        ? 'bg-white dark:bg-slate-900 border-l-4 border-l-indigo-600' 
                        : 'hover:bg-white dark:hover:bg-slate-900'
                    }`}
                >
                    <div className="relative">
                        <img src={chat.participant.avatarUrl} alt={chat.participant.name} className="w-12 h-12 rounded-full object-cover" />
                        {/* Online status indicator */}
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-semibold text-slate-900 dark:text-white truncate">{chat.participant.name}</h3>
                            <span className="text-xs text-slate-500 dark:text-slate-400">10:00 AM</span>
                        </div>
                        <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                            {chat.lastMessage}
                        </p>
                    </div>
                    {chat.unreadCount > 0 && (
                        <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                            {chat.unreadCount}
                        </div>
                    )}
                </div>
            ))}
         </div>
      </div>

      {/* Chat Window */}
      {selectedChat ? (
          <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950/50">
             {/* Header */}
             <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img src={selectedChat.participant.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{selectedChat.participant.name}</h3>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Online</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                    <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Phone size={20} /></button>
                    <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Video size={20} /></button>
                    <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><MoreVertical size={20} /></button>
                </div>
             </div>

             {/* Messages */}
             <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {selectedChat.messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                            msg.isMe 
                            ? 'bg-indigo-600 text-white rounded-br-none' 
                            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-bl-none'
                        }`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                            <span className={`text-[10px] mt-2 block text-right ${msg.isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                                {msg.timestamp}
                            </span>
                        </div>
                    </div>
                ))}
             </div>

             {/* Input */}
             <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <form onSubmit={handleSendMessage} className="flex gap-4">
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message..." 
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                    />
                    <button 
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center"
                    >
                        <Send size={20} />
                    </button>
                </form>
             </div>
          </div>
      ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <p>Select a chat to start messaging</p>
          </div>
      )}
    </div>
  );
};

export default ChatSystem;
