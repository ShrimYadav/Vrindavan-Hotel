import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone, HelpCircle } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface Message {
  sender: 'concierge' | 'user';
  text: string;
  time: string;
}

export const ConciergeChatDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'concierge',
      text: 'Pranam and warm greetings from The Vrindavan Hotel & Palace, Indore. I am Devraj, your Royal Concierge. How may I assist your upcoming visit?',
      time: 'Just now',
    },
  ]);

  const quickQuestions = [
    'What is check-in & check-out time?',
    'Tell me about CHHAT Rooftop Dining',
    'How far is the Airport and Station?',
    'Is the dining 100% Pure Vegetarian?',
    'Can you arrange a tour to Sarafa & Rajwada?',
  ];

  const getAutomatedReply = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('check-in') || q.includes('check out') || q.includes('time')) {
      return `Our palace check-in commences at 2:00 PM and check-out is at 12:00 PM. Early check-in or late luggage safekeeping can be effortlessly accommodated with our front desk.`;
    }
    if (q.includes('chhat') || q.includes('rooftop') || q.includes('dinner')) {
      return `CHHAT Sky Lounge & Rooftop is open daily from 6:30 PM to 12:30 AM, featuring panoramic sunset vistas of Indore, live classical instrumental music, and progressive tandoori delicacies.`;
    }
    if (q.includes('airport') || q.includes('station') || q.includes('distance')) {
      return `We are centrally located in Ushaganj: approximately 15 minutes (6.2 miles) from Devi Ahilya Bai Holkar International Airport and only 5 minutes (1.2 miles) from Indore Junction. Luxury chauffeured Mercedes-Benz pickups are available.`;
    }
    if (q.includes('vegetarian') || q.includes('food') || q.includes('jain') || q.includes('pure')) {
      return `Yes, absolutely! Mayur Restaurant is celebrated for its 100% pure vegetarian royal heritage kitchen protocol, including our grand Holkar Royal Thali, Dal Bafla, and dedicated Jain dietary preparation.`;
    }
    if (q.includes('sarafa') || q.includes('rajwada') || q.includes('tour') || q.includes('ujjain')) {
      return `Rajwada Palace is just 7 minutes away, and the famous Sarafa midnight street food market is 10 minutes away. We also operate private chauffeur excursions to Mahakaleshwar Jyotirlinga in Ujjain (55 mins).`;
    }
    return `Certainly! We would be delighted to personalize this for your stay. You can also connect directly with our head concierge at ${HOTEL_INFO.phoneConcierge} anytime.`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const replyText = getAutomatedReply(query);
      const botMsg: Message = {
        sender: 'concierge',
        text: replyText,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 transition-all cursor-pointer border border-amber-300/40"
          title="Connect with Royal Concierge"
        >
          <Sparkles className="w-4 h-4 text-stone-950" />
          <span className="hidden sm:inline">Royal Concierge</span>
          <MessageSquare className="w-4 h-4" />
        </button>
      )}

      {/* Concierge Drawer Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full sm:w-96 max-w-[calc(100vw-2rem)] h-[520px] bg-[#09101c] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="p-4 bg-[#060a12] border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-cinzel text-xs font-bold">
                V
              </div>
              <div>
                <h4 className="text-xs font-cinzel font-bold text-white">The Vrindavan Concierge</h4>
                <div className="text-[10px] text-amber-300/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>24/7 Palace Desk Active</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-stone-900/60 border-b border-stone-800 flex gap-1.5 overflow-x-auto text-[11px]">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-md bg-stone-800 text-stone-300 hover:text-amber-200 hover:bg-stone-700 whitespace-nowrap cursor-pointer transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-stone-950 font-medium rounded-br-none'
                      : 'bg-stone-900 border border-stone-800 text-stone-200 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[9px] opacity-60 block mt-1 text-right">{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Call ribbon */}
          <div className="px-4 py-1.5 bg-black/50 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <span>Prefer a voice call?</span>
            <a
              href={`tel:${HOTEL_INFO.phoneConcierge}`}
              className="text-amber-300 hover:underline flex items-center gap-1 font-mono"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{HOTEL_INFO.phoneConcierge}</span>
            </a>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#060a12] border-t border-stone-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask about suites, dining, directions..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
