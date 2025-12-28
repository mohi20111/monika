
import React, { useState, useEffect } from 'react';
import { Question, QuestionType } from '../types';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('history_bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(question.id));
  }, [question.id]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const bookmarks = JSON.parse(localStorage.getItem('history_bookmarks') || '[]');
    let newBookmarks;
    if (bookmarks.includes(question.id)) {
      newBookmarks = bookmarks.filter((id: string) => id !== question.id);
      setIsBookmarked(false);
    } else {
      newBookmarks = [...bookmarks, question.id];
      setIsBookmarked(true);
    }
    localStorage.setItem('history_bookmarks', JSON.stringify(newBookmarks));
    // Dispatch a custom event to notify other components (like App.tsx) to refresh if needed
    window.dispatchEvent(new Event('bookmarksUpdated'));
  };

  const isCorrect = selectedOption === question.correctAnswer;

  const handleOptionClick = (option: string) => {
    if (!showExplanation) {
      setSelectedOption(option);
      setShowExplanation(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8 hover:shadow-md transition-shadow duration-300 relative group/card">
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
            {question.exam} • {question.year}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-[10px] text-slate-400 font-mono tracking-tighter hidden md:inline">REF: {question.id}</span>
          <button 
            onClick={toggleBookmark}
            className={`p-2 rounded-xl transition-all duration-300 transform active:scale-90 ${
              isBookmarked 
                ? 'bg-orange-100 text-orange-600 shadow-inner' 
                : 'bg-slate-100 text-slate-400 hover:bg-orange-50 hover:text-orange-400'
            }`}
            title={isBookmarked ? "Remove from Bookmarks" : "Save for Later Review"}
          >
            <svg className={`w-5 h-5 ${isBookmarked ? 'fill-current' : 'fill-none'}`} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-slate-800 font-semibold leading-relaxed whitespace-pre-wrap font-['Noto_Sans_Devanagari']">
            {question.questionText}
          </p>
          
          {question.type === QuestionType.MATCHING && question.matchingListA && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 bg-orange-50/50 p-6 rounded-2xl border border-orange-100 font-['Noto_Sans_Devanagari']">
              <div className="space-y-3">
                <p className="font-bold text-orange-800 border-b border-orange-200 pb-2 text-sm uppercase">List I (A)</p>
                {question.matchingListA.map((item, idx) => (
                  <p key={idx} className="text-base text-slate-700">({String.fromCharCode(65 + idx)}) {item}</p>
                ))}
              </div>
              <div className="space-y-3">
                <p className="font-bold text-orange-800 border-b border-orange-200 pb-2 text-sm uppercase">List II (B)</p>
                {question.matchingListB?.map((item, idx) => (
                  <p key={idx} className="text-base text-slate-700">({idx + 1}) {item}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-4">
          {question.options?.map((option, idx) => {
            const isOptionSelected = selectedOption === option;
            const isOptionCorrect = option === question.correctAnswer;
            
            let buttonClass = "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-start font-['Noto_Sans_Devanagari'] ";
            let iconClass = "w-8 h-8 rounded-xl border-2 flex items-center justify-center mr-5 text-sm font-black shrink-0 transition-colors ";

            if (showExplanation) {
              if (isOptionCorrect) {
                buttonClass += "bg-green-50 border-green-500 text-green-900 ring-4 ring-green-100/50 shadow-sm";
                iconClass += "bg-green-600 border-green-600 text-white";
              } else if (isOptionSelected && !isOptionCorrect) {
                buttonClass += "bg-red-50 border-red-500 text-red-900";
                iconClass += "bg-red-600 border-red-600 text-white";
              } else {
                buttonClass += "bg-white border-slate-100 text-slate-400 opacity-60 scale-[0.98]";
                iconClass += "bg-slate-50 border-slate-200 text-slate-400";
              }
            } else {
              buttonClass += "bg-white border-slate-100 hover:border-orange-400 hover:bg-orange-50/50 text-slate-700 shadow-sm active:scale-[0.99]";
              iconClass += "bg-slate-50 border-slate-200 text-slate-500 group-hover:border-orange-400 group-hover:text-orange-600 group-hover:bg-white";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                disabled={showExplanation}
                className={`${buttonClass} group`}
              >
                <span className={iconClass}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-bold pt-1 text-lg">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Solution Area */}
        {showExplanation && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden border-t-4 border-green-500 shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <span className="text-xs font-black text-green-500 uppercase tracking-[0.2em] mb-2 block">Correct Answer</span>
                    <span className="text-2xl font-black text-white font-['Noto_Sans_Devanagari']">{question.correctAnswer}</span>
                  </div>
                  <div className="flex space-x-3">
                    <button className={`p-2.5 rounded-xl transition ${isBookmarked ? 'bg-orange-600 text-white' : 'bg-white/10 hover:bg-white/20'}`} onClick={toggleBookmark}>
                      <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                    </button>
                  </div>
                </div>
                
                <h4 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] mb-4">
                   Detailed Explanation (Hindi)
                </h4>
                
                <div className="text-slate-200 leading-relaxed text-lg font-['Noto_Sans_Devanagari']">
                  <p className="whitespace-pre-wrap">{question.explanation}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium italic">Was this helpful for your preparation?</span>
                  <div className="flex space-x-6">
                    <button className="flex items-center space-x-2 text-slate-400 hover:text-orange-500 transition font-bold uppercase tracking-wider text-xs">
                      <span>👍</span> <span>Yes</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-400 hover:text-red-500 transition font-bold uppercase tracking-wider text-xs">
                      <span>👎</span> <span>No</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
