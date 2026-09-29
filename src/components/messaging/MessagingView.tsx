import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Check,
  CheckCheck,
  Circle,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MessagingView: React.FC = () => {
  const {
    currentUser,
    conversations,
    messages,
    sendMessage,
    activeConversationId,
    setActiveConversationId,
    setSelectedProfileId,
    setActiveTab
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [searchConvQuery, setSearchConvQuery] = useState('');

  // Active conversation
  const currentConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeConvMessages = currentConv ? messages[currentConv.id] || [] : [];

  const filteredConversations = conversations.filter(c => {
    if (!searchConvQuery.trim()) return true;
    return (
      c.participantName.toLowerCase().includes(searchConvQuery.toLowerCase()) ||
      c.participantHeadline.toLowerCase().includes(searchConvQuery.toLowerCase())
    );
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentConv) return;
    sendMessage(currentConv.id, messageInput);
    setMessageInput('');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 pb-24">
      
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] shadow-sm grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
        
        {/* Left Column: Conversations List (5 Cols) */}
        <div className="md:col-span-5 border-r border-slate-200 dark:border-slate-800 flex flex-col">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-cyan-500" />
                <span>Encrypted Direct Messages</span>
              </h2>
              <span className="text-[10px] font-mono text-emerald-500 font-semibold flex items-center gap-1">
                <Circle className="h-2 w-2 fill-current" /> WebSocket Active
              </span>
            </div>

            {/* Search */}
            <div className="relative mt-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchConvQuery}
                onChange={e => setSearchConvQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-900/60 pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Conversations Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
            {filteredConversations.map(conv => {
              const isSelected = conv.id === currentConv?.id;

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`cursor-pointer p-3.5 transition-colors flex items-start gap-3 ${
                    isSelected
                      ? 'bg-cyan-50/30 dark:bg-cyan-950/20 border-l-4 border-cyan-500'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#121824]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {conv.participantName}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {conv.lastMessageTimestamp}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Thread (7 Cols) */}
        <div className="md:col-span-7 flex flex-col justify-between">
          
          {currentConv ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedProfileId(currentConv.participantId);
                    setActiveTab('profile');
                  }}
                  className="flex items-center gap-3 text-left focus:outline-none"
                >
                  <img
                    src={currentConv.participantAvatar}
                    alt={currentConv.participantName}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-750"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white hover:text-cyan-500">
                      {currentConv.participantName}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {currentConv.participantHeadline}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[10px] font-mono text-emerald-500">
                    Online
                  </span>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[460px]">
                {activeConvMessages.map(msg => {
                  const isMine = msg.senderId === currentUser.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md rounded-2xl p-3 text-xs leading-relaxed ${
                          isMine
                            ? 'bg-cyan-500 text-white rounded-br-xs'
                            : 'bg-slate-100 dark:bg-slate-850 text-slate-800 dark:text-slate-200 rounded-bl-xs'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                        <span>{msg.timestamp}</span>
                        {isMine && <CheckCheck className="h-3 w-3 text-cyan-400" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Box */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  placeholder={`Message ${currentConv.participantName.split(' ')[0]}...`}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-900/60 px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-400 disabled:opacity-40 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-slate-400 text-xs">
              Select a conversation to start messaging
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
