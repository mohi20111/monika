
import React, { useState, useEffect } from 'react';
import { Exam, Question } from '../types';

interface ExamModeProps {
  exam: Exam;
  onExit: () => void;
}

const ExamMode: React.FC<ExamModeProps> = ({ exam, onExit }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.timeMinutes * 60);

  useEffect(() => {
    if (isSubmitted) return;

    if (timeLeft <= 0) {
      setIsSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    exam.questions.forEach((q) => {
      if (!answers[q.id]) {
        unattempted++;
      } else if (answers[q.id] === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    // Negative marking: 1 mark per correct, -0.33 per incorrect
    const rawScore = (correct * 1) - (incorrect * 0.33);
    const score = Math.max(0, rawScore); // Ensure score doesn't go below zero if desired, or keep raw
    return { correct, incorrect, unattempted, score };
  };

  if (isSubmitted) {
    const { correct, incorrect, unattempted, score } = calculateResults();
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 animate-in fade-in duration-500">
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-slate-100 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-2 text-slate-900 uppercase tracking-tight">Exam Results</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{exam.title}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-green-50 p-8 rounded-[2rem] text-center border border-green-100 shadow-sm">
              <span className="block text-5xl font-black text-green-600 mb-2">{correct}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-green-700">Correct</span>
            </div>
            <div className="bg-red-50 p-8 rounded-[2rem] text-center border border-red-100 shadow-sm">
              <span className="block text-5xl font-black text-red-600 mb-2">{incorrect}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-700">Incorrect</span>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2rem] text-center border border-slate-100 shadow-sm">
              <span className="block text-5xl font-black text-slate-400 mb-2">{unattempted}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Skipped</span>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-amber-500 p-8 rounded-[2rem] text-center shadow-xl shadow-orange-200">
              <span className="block text-5xl font-black text-white mb-2">{score.toFixed(2)}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-100">Final Score</span>
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <h3 className="font-black text-2xl text-slate-800 uppercase tracking-tight">Detailed Analysis</h3>
              <span className="text-xs font-bold text-slate-400 italic">Review your answers and solutions below</span>
            </div>

            {exam.questions.map((q, i) => (
              <div key={q.id} className="group relative">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 font-['Noto_Sans_Devanagari'] transition-all hover:bg-white hover:shadow-lg hover:border-orange-100">
                  <div className="flex items-start mb-6">
                    <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shrink-0 mr-4 mt-1">
                      {i + 1}
                    </span>
                    <p className="font-bold text-xl text-slate-800 leading-relaxed">{q.questionText}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-2xl flex items-center justify-between ${
                      !answers[q.id] ? 'bg-slate-100 border border-slate-200' :
                      answers[q.id] === q.correctAnswer ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
                    }`}>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Choice</span>
                      <span className={`font-black ${
                        !answers[q.id] ? 'text-slate-500' :
                        answers[q.id] === q.correctAnswer ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {answers[q.id] || 'Not Answered'}
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl bg-green-100 border border-green-200 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Correct Key</span>
                      <span className="font-black text-green-800">{q.correctAnswer}</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-inner">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-3">Detailed Solution</h4>
                    <p className="text-slate-700 text-lg leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={onExit} 
              className="bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-sm tracking-[0.2em] shadow-2xl hover:bg-black transition transform hover:-translate-y-1 active:scale-95"
            >
              BACK TO DASHBOARD
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = exam.questions[currentIdx];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-['Inter']">
      <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col h-[90vh] border border-slate-200">
        {/* Exam Header */}
        <div className="bg-slate-900 p-8 flex flex-col md:flex-row justify-between items-center text-white relative">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-3 mb-1">
              <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
              <h2 className="font-black text-2xl uppercase tracking-tighter">{exam.title}</h2>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Official History Mock Interface</p>
          </div>
          
          <div className="flex items-center space-x-10">
            <div className="text-center px-6 border-x border-white/10">
              <span className="block text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">Time Left</span>
              <span className={`text-3xl font-black tabular-nums ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-orange-500'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <button 
              onClick={() => setIsSubmitted(true)} 
              className="bg-orange-600 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 transition shadow-xl shadow-orange-900/40 active:scale-95"
            >
              Finish Exam
            </button>
          </div>
        </div>

        {/* Exam Body */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          {/* Main Question Area */}
          <div className="flex-grow p-8 md:p-16 overflow-y-auto bg-white">
            <div className="max-w-3xl">
              <div className="mb-12">
                <span className="bg-orange-100 text-orange-700 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block">
                  Question {currentIdx + 1} of {exam.questions.length}
                </span>
                <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight font-['Noto_Sans_Devanagari']">
                  {q.questionText}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 font-['Noto_Sans_Devanagari']">
                {q.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                    className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all flex items-center group relative overflow-hidden ${
                      answers[q.id] === opt 
                        ? 'bg-orange-50 border-orange-600 text-orange-950 shadow-md scale-[1.01]' 
                        : 'bg-white border-slate-100 hover:border-orange-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-6 font-black text-lg transition-all ${
                      answers[q.id] === opt ? 'bg-orange-600 text-white rotate-6' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-xl font-bold pt-0.5">{opt}</span>
                    
                    {answers[q.id] === opt && (
                      <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Question Nav */}
          <div className="w-full md:w-96 bg-slate-50 border-l border-slate-100 p-10 overflow-y-auto hidden lg:block">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-slate-400">Navigation Palette</h4>
            <div className="grid grid-cols-4 xl:grid-cols-5 gap-3">
              {exam.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-full aspect-square rounded-2xl text-xs font-black transition-all border-2 ${
                    currentIdx === i 
                      ? 'border-orange-600 bg-orange-600 text-white shadow-lg scale-110 z-10' 
                      : answers[exam.questions[i].id] 
                        ? 'bg-green-100 border-green-200 text-green-700' 
                        : 'bg-white border-slate-200 text-slate-400 hover:border-orange-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <div className="mt-12 p-8 bg-white rounded-[2rem] border border-slate-100 space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Legend</h5>
              <div className="flex items-center text-xs font-bold text-slate-600">
                <span className="w-4 h-4 bg-orange-600 rounded-lg mr-3 shadow-sm"></span> Current
              </div>
              <div className="flex items-center text-xs font-bold text-slate-600">
                <span className="w-4 h-4 bg-green-100 border border-green-200 rounded-lg mr-3 shadow-sm"></span> Answered
              </div>
              <div className="flex items-center text-xs font-bold text-slate-600">
                <span className="w-4 h-4 bg-white border border-slate-200 rounded-lg mr-3 shadow-sm"></span> Unvisited
              </div>
            </div>

            <div className="mt-8 p-6 bg-red-50 rounded-[2rem] border border-red-100">
              <p className="text-[10px] font-black text-red-700 uppercase tracking-widest leading-relaxed">
                Warning: Negative marking of 0.33 is active for this paper.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Nav */}
        <div className="p-8 bg-white border-t border-slate-100 flex justify-between items-center">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="flex items-center space-x-3 font-black text-slate-400 disabled:opacity-30 hover:text-orange-600 transition group"
          >
            <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-orange-50 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
            </div>
            <span className="text-xs uppercase tracking-widest">Previous</span>
          </button>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setAnswers({ ...answers, [q.id]: '' })} 
              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition px-4 py-2 hover:bg-red-50 rounded-xl"
            >
              Clear Choice
            </button>
            <div className="h-4 w-px bg-slate-100"></div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Section: History Core</span>
          </div>

          <button 
            disabled={currentIdx === exam.questions.length - 1}
            onClick={() => setCurrentIdx(prev => prev + 1)}
            className="flex items-center space-x-3 font-black text-orange-600 disabled:opacity-30 hover:text-orange-500 transition group"
          >
            <span className="text-xs uppercase tracking-widest">Next Question</span>
            <div className="bg-orange-50 p-3 rounded-xl group-hover:bg-orange-100 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamMode;
