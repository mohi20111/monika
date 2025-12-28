
import React, { useState, useEffect } from 'react';

const DAILY_QUESTION = {
  question: "किस मुगल शासक ने 'सिजदा' और 'पाबोस' प्रथा का अंत किया था?",
  options: ["अकबर", "जहाँगीर", "शाहजहाँ", "औरंगजेब"],
  correct: "शाहजहाँ",
  explanation: "सिजदा (घुटनों के बल बैठकर सिर झुकाना) और पाबोस (सुल्तान के पैरों को चूमना) प्रथाओं की शुरुआत गयासुद्दीन बलबन ने की थी। शाहजहाँ ने अपने शासनकाल में इन्हें 'गैर-इस्लामी' मानते हुए समाप्त कर दिया।"
};

interface DailyChallengeProps {
  isOpen: boolean;
  onClose: () => void;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'intro' | 'options' | 'result'>('intro');
  const [selected, setSelected] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelect = (option: string) => {
    setSelected(option);
    setStep('result');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-indigo-950 w-full max-w-xl rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-indigo-300 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="relative z-10">
          <p className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full mr-3 animate-pulse"></span>
            Question of the Day
          </p>
          <h4 className="text-3xl font-black mb-8 leading-tight">Can you solve this?</h4>

          {step === 'intro' && (
            <div className="space-y-8">
              <div className="bg-white/5 rounded-3xl p-8 border border-white/10 font-['Noto_Sans_Devanagari']">
                <p className="text-xl md:text-2xl italic leading-relaxed text-center">"{DAILY_QUESTION.question}"</p>
              </div>
              <button 
                onClick={() => setStep('options')}
                className="w-full bg-orange-600 hover:bg-orange-500 py-5 rounded-2xl font-black text-lg transition shadow-xl active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Check Options</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}

          {step === 'options' && (
            <div className="space-y-4 font-['Noto_Sans_Devanagari']">
               <p className="text-indigo-300 font-bold mb-4 uppercase tracking-widest text-xs">Choose the correct answer:</p>
               {DAILY_QUESTION.options.map((opt, idx) => (
                 <button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/15 transition-all font-bold text-lg flex items-center group/btn"
                 >
                   <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-4 text-sm group-hover/btn:bg-indigo-500 transition-colors">
                    {String.fromCharCode(65 + idx)}
                   </span>
                   {opt}
                 </button>
               ))}
            </div>
          )}

          {step === 'result' && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
              <div className={`mb-6 p-6 rounded-3xl font-black flex items-center justify-between ${
                selected === DAILY_QUESTION.correct ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{selected === DAILY_QUESTION.correct ? '✓' : '✗'}</span>
                  <span className="text-lg">{selected === DAILY_QUESTION.correct ? 'Brilliant! Correct' : 'Oops! Incorrect'}</span>
                </div>
                <span className="text-xs uppercase opacity-75">Ans: {DAILY_QUESTION.correct}</span>
              </div>

              <div className="bg-white/5 rounded-3xl p-8 border border-white/10 font-['Noto_Sans_Devanagari']">
                <h5 className="text-amber-400 font-black text-xs uppercase tracking-widest mb-4 border-b border-white/10 pb-3">
                  Detailed Solution (Hindi)
                </h5>
                <p className="text-lg leading-relaxed text-indigo-50 whitespace-pre-wrap">
                  {DAILY_QUESTION.explanation}
                </p>
              </div>
              
              <button 
                onClick={onClose}
                className="w-full mt-8 bg-indigo-500 hover:bg-indigo-400 py-4 rounded-2xl font-black transition"
              >
                Close and Continue Study
              </button>
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
           <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;
