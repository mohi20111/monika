
import React, { useState, useRef, useEffect } from 'react';
import { askHistoryExpert, getDeepExplanation } from '../services/geminiService';

// The aistudio interface and its attachment to the window object are handled globally by the environment.
// Redundant declarations here can cause type mismatch and modifier errors.

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string, isDeepDive?: boolean}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await askHistoryExpert(userMsg);
    setMessages(prev => [...prev, { role: 'bot', content: response || "I'm sorry, I'm having trouble connecting right now." }]);
    setIsLoading(false);
  };

  const handleDeepen = async (idx: number) => {
    // Gemini 3 Pro requires API key selection check
    try {
      // @ts-ignore - Assuming window.aistudio is globally available via environment
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore - Assuming window.aistudio is globally available via environment
        await window.aistudio.openSelectKey();
        // Proceeding after opening key selector as per guidelines
      }

      // Find the original question (usually the message before the bot response)
      let question = "";
      for (let i = idx - 1; i >= 0; i--) {
        if (messages[i].role === 'user') {
          question = messages[i].content;
          break;
        }
      }
      
      const context = messages[idx].content;
      setIsLoading(true);

      const deepDive = await getDeepExplanation(question, context);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: deepDive || "विस्तृत व्याख्या प्राप्त करने में त्रुटि हुई।", 
        isDeepDive: true 
      }]);
    } catch (error: any) {
      if (error.message === "API_KEY_ERROR") {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ask" className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[600px] transition-all hover:shadow-orange-100/50">
      <div className="bg-orange-600 p-5 text-white flex justify-between items-center">
        <div>
          <h3 className="font-black tracking-tight">Mohit Awasthi Sir</h3>
          <p className="text-[10px] text-orange-200 font-bold uppercase tracking-widest">AI Academic Assistant</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-sm"></span>
          <span className="text-[10px] font-black uppercase">Online</span>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-5 bg-slate-50/50">
        {messages.length === 0 && (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-black">MA</div>
            <h4 className="font-bold text-slate-800 mb-2">Welcome to History AI</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Ask any history related doubt in English or Hindi. I will provide a detailed academic explanation.
            </p>
          </div>
        )}
        {messages.map((m, idx) => (
          <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-2xl shadow-sm text-sm md:text-base font-['Noto_Sans_Devanagari'] leading-relaxed relative group ${
              m.role === 'user' 
                ? 'bg-orange-600 text-white rounded-tr-none' 
                : m.isDeepDive 
                  ? 'bg-indigo-900 text-indigo-50 border border-indigo-700 rounded-tl-none ring-2 ring-indigo-500/20' 
                  : 'bg-white border border-slate-200 rounded-tl-none text-slate-800'
            }`}>
              {m.isDeepDive && (
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2 border-b border-indigo-800 pb-1">
                  Academic Deep Dive Explanation (Gemini Pro)
                </div>
              )}
              {m.content}
              
              {/* Deeper explanation button next to the bot message */}
              {m.role === 'bot' && !m.isDeepDive && (
                <div className="absolute -right-12 top-0 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleDeepen(idx)}
                    disabled={isLoading}
                    title="Request deeper academic explanation"
                    className="p-2 bg-orange-100 text-orange-600 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition-all transform active:scale-90 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            {/* Alternative button layout for mobile/visibility if not hovered */}
            {m.role === 'bot' && !m.isDeepDive && (
              <button 
                onClick={() => handleDeepen(idx)}
                disabled={isLoading}
                className="mt-2 text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 flex items-center space-x-1 px-3 py-1 bg-orange-50 rounded-full transition-colors active:scale-95 disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>विस्तृत व्याख्या (Academic Deep Dive)</span>
              </button>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mohit Sir is analyzing...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 border-t bg-white flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your history doubt here..."
          className="flex-grow p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-orange-600 text-white w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-orange-700 transition shadow-lg active:scale-95 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
