'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, User, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

interface AiTravelAssistantProps {
  lang: 'en' | 'hi';
}

export default function AiTravelAssistant({ lang }: AiTravelAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string; link?: string }[]>([
    {
      sender: 'ai',
      text:
        lang === 'hi'
          ? 'नमस्ते! मैं आपका कुंभ 2027 AI गाइड हूँ। आप मुझसे निकटतम मंदिर, आगामी अमृत स्नान, बजट होटल या 2-दिवसीय यात्रा कार्यक्रम पूछ सकते हैं।'
          : 'Namaste! I am your Kumbh 2027 AI Guide. Ask me about nearby temples, upcoming Amrit Snan dates, budget hotels, or a custom itinerary.'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user' as const, text: query };
    const qLower = query.toLowerCase();

    let aiReply = {
      sender: 'ai' as const,
      text: '',
      link: ''
    };

    if (qLower.includes('snan') || qLower.includes('स्नान') || qLower.includes('date')) {
      aiReply = {
        sender: 'ai',
        text:
          lang === 'hi'
            ? 'कुंभ 2027 का प्रथम शाही अमृत स्नान महाशिवरात्रि (06 मार्च 2027) को हर की पौड़ी पर होगा। इसके बाद 08 मार्च, 15 मार्च और 14 अप्रैल को मुख्य अमृत स्नान हैं।'
            : 'The First Royal Amrit Snan of Kumbh 2027 is on Mahashivratri (06 March 2027) at Har Ki Pauri, followed by 08 March, 15 March, and 14 April.',
        link: '/kumbh-2027'
      };
    } else if (qLower.includes('aarti') || qLower.includes('आरती') || qLower.includes('har ki pauri')) {
      aiReply = {
        sender: 'ai',
        text:
          lang === 'hi'
            ? 'संध्या गंगा आरती प्रतिदिन हर की पौड़ी पर सायं 6:00 से 7:00 बजे के मध्य होती है। उत्तम दर्शन हेतु 5:30 बजे तक पहुंचना श्रेष्ठ है।'
            : 'Evening Ganga Aarti takes place daily at Har Ki Pauri between 6:00 PM and 7:00 PM. We recommend arriving by 5:30 PM for good seating.',
        link: '/explore/har-ki-pauri'
      };
    } else if (qLower.includes('hotel') || qLower.includes('होटल') || qLower.includes('stay') || qLower.includes('धर्मशाला')) {
      aiReply = {
        sender: 'ai',
        text:
          lang === 'hi'
            ? 'हर की पौड़ी के पास गंगा लहरी हेरिटेज होटल और भूपतवाला में रामानंद धर्मशाला (दान आधारित) उपलब्ध हैं। आप सीधे ऐप से पूछताछ भेज सकते हैं।'
            : 'Near Har Ki Pauri, Ganga Lahari Hotel and Bhupatwala Ramanand Dharamshala (donation-based) are verified. You can submit direct booking enquiries.',
        link: '/explore?tab=accommodations'
      };
    } else {
      aiReply = {
        sender: 'ai',
        text:
          lang === 'hi'
            ? 'हरिद्वार के पवित्र 16 तीर्थों, माँ मनसा देवी रोपवे, चंडी देवी, दक्षेश्वर महादेव और शांति कुंज के विस्तृत विवरण आप दर्शन टैब में देख सकते हैं।'
            : 'You can explore all 16 verified Haridwar sacred shrines, Mansa Devi ropeway, Chandi Devi, and Shantikunj directly in the Explore tab.',
        link: '/explore'
      };
    }

    setMessages([...messages, userMsg, aiReply]);
    setInput('');
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-40 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#F47A20] to-[#C65312] text-white shadow-xl shadow-[#F47A20]/35 flex items-center gap-2 active:scale-95 transition-all"
      >
        <Bot size={18} />
        <span className="text-xs font-bold tracking-tight">
          {lang === 'hi' ? 'AI कुंभ गाइड' : 'Kumbh AI'}
        </span>
      </button>

      {/* Slide-over Modal / Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center p-3">
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#F0EAE1] shadow-2xl flex flex-col h-[75vh] overflow-hidden animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="p-3.5 bg-gradient-to-r from-[#F47A20] to-[#C65312] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold">KumbhConnect AI Assistant</h3>
                  <span className="text-[10px] text-white/80">Bilingual Pilgrim Travel Helper</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white"
              >
                <X size={15} />
              </button>
            </div>

            {/* Quick Prompt Pills */}
            <div className="flex gap-1.5 p-2 bg-[#FFFCF8] border-b border-[#F0EAE1] overflow-x-auto no-scrollbar">
              {[
                { en: 'Next Amrit Snan?', hi: 'अगला अमृत स्नान?' },
                { en: 'Ganga Aarti Time?', hi: 'गंगा आरती का समय?' },
                { en: 'Suggest Budget Hotel', hi: 'बजट धर्मशाला बताएं' }
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(lang === 'hi' ? p.hi : p.en)}
                  className="px-2.5 py-1 rounded-full bg-white border border-[#F0EAE1] text-[10px] font-semibold text-[#555555] hover:text-[#F47A20] whitespace-nowrap flex-shrink-0"
                >
                  {lang === 'hi' ? p.hi : p.en}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-[#FFF1E5] text-[#C65312] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      AI
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-2.5 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#F47A20] text-white'
                        : 'bg-[#FFFCF8] border border-[#F0EAE1] text-[#242424]'
                    }`}
                  >
                    <div>{m.text}</div>
                    {m.link && (
                      <Link
                        href={m.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-[#C65312] underline"
                      >
                        <span>Open details page</span>
                        <ChevronRight size={10} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-2.5 bg-white border-t border-[#F0EAE1] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={
                  lang === 'hi' ? 'कुंभ व यात्रा से संबंधित कुछ भी पूछें...' : 'Ask about Kumbh, temples, hotels...'
                }
                className="flex-1 text-xs text-[#242424] bg-[#FFFCF8] border border-[#F0EAE1] rounded-xl px-3 py-2 outline-none"
              />
              <button
                onClick={() => handleSend()}
                className="w-8 h-8 rounded-xl bg-[#F47A20] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
