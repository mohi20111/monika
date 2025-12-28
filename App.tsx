
import React, { useState, useMemo, useEffect } from 'react';
import Layout from './components/Layout';
import QuestionCard from './components/QuestionCard';
import ChatBot from './components/ChatBot';
import DailyChallenge from './components/DailyChallenge';
import LoginModal from './components/LoginModal';
import ExamMode from './components/ExamMode';
import AdminPanel from './components/AdminPanel';
import StudyMaterial from './components/StudyMaterial';
import { CATEGORIES, MOCK_QUESTIONS, PREMIUM_EXAMS } from './constants';
import { Exam, User } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>('mega-bank');
  const [currentView, setCurrentView] = useState<'dashboard' | 'study-material'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState(false);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [paymentNotified, setPaymentNotified] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#notes') {
        setCurrentView('study-material');
      } else if (window.location.hash === '#questions' || window.location.hash === '#home' || !window.location.hash) {
        setCurrentView('dashboard');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    const loadBookmarks = () => {
      const bookmarks = JSON.parse(localStorage.getItem('history_bookmarks') || '[]');
      setBookmarkedIds(bookmarks);
    };

    loadBookmarks();
    window.addEventListener('bookmarksUpdated', loadBookmarks);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('bookmarksUpdated', loadBookmarks);
    }
  }, []);

  const filteredQuestions = useMemo(() => {
    let qs = MOCK_QUESTIONS;
    
    if (activeCategory === 'bookmarks') {
      qs = qs.filter(q => bookmarkedIds.includes(q.id));
    } else if (activeCategory && activeCategory !== 'premium') {
      // Robust matching logic using tags and exam names
      if (activeCategory === 'mega-bank') {
        qs = qs.filter(q => q.exam === 'Free Mega Bank');
      } else if (activeCategory === 'uphesc') {
        qs = qs.filter(q => q.exam.includes('UPHESC'));
      } else if (activeCategory === 'net-jrf') {
        qs = qs.filter(q => q.exam.includes('NET') || q.exam.includes('SET'));
      } else if (activeCategory === 'upsc-ias') {
        qs = qs.filter(q => q.exam.includes('UPSC') || q.exam.includes('IAS'));
      } else if (activeCategory === 'state-psc') {
        qs = qs.filter(q => ['RPSC', 'BPSC', 'MPSC', 'UPPSC', 'PSC'].some(keyword => q.exam.includes(keyword)));
      } else if (activeCategory === 'historiography') {
        qs = qs.filter(q => q.exam.toLowerCase().includes('historiography') || q.exam.includes('लेखन'));
      }
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      qs = qs.filter(q => 
        q.questionText.toLowerCase().includes(lowerQuery) || 
        q.exam.toLowerCase().includes(lowerQuery) ||
        q.explanation.toLowerCase().includes(lowerQuery)
      );
    }
    return qs;
  }, [activeCategory, searchQuery, bookmarkedIds]);

  const handleNotifyPayment = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const updatedUsers = users.map((u: User) => {
      if (u.id === user.id) return { ...u, paymentRequested: true };
      return u;
    });
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
    const phoneNumber = "7007846241";
    const message = encodeURIComponent(`Hello Mohit Sir, I am ${user.name}. I have paid 499rs for the History Test Series. Please verify my account: ${user.email}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setPaymentNotified(true);
    alert('Inform sent to Mohit Sir! Please wait for approval.');
  };

  if (activeExam) {
    return <ExamMode exam={activeExam} onExit={() => setActiveExam(null)} />;
  }

  return (
    <Layout>
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
          setPaymentNotified(loggedInUser.paymentRequested || false);
        }} 
      />
      <DailyChallenge 
        isOpen={isDailyChallengeOpen} 
        onClose={() => setIsDailyChallengeOpen(false)} 
      />

      <div className="flex justify-between items-center mb-8">
        <div>
          {user?.isAdmin && (
            <button 
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl shadow-xl hover:bg-indigo-700 transition font-black text-xs uppercase tracking-widest ring-4 ring-indigo-500/20"
            >
              {showAdminPanel ? '← Exit Admin Mode' : '🛡️ Open Master Admin'}
            </button>
          )}
        </div>
        {user ? (
          <div className="flex items-center space-x-4 bg-white px-6 py-2.5 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-right">
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">{user.isPremium ? 'Premium Student' : 'Free Member'}</span>
              <span className="block text-sm font-bold text-slate-800">{user.name}</span>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md ${user.isPremium ? 'bg-gradient-to-br from-orange-600 to-amber-500' : 'bg-slate-400'}`}>
              {user.name[0].toUpperCase()}
            </div>
            <button onClick={() => { setUser(null); setShowAdminPanel(false); }} className="p-2 text-slate-400 hover:text-red-500 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition active:scale-95"
          >
            Sign In / Join Academy
          </button>
        )}
      </div>

      {showAdminPanel && user?.isAdmin ? (
        <AdminPanel />
      ) : (
        <>
          {currentView === 'study-material' ? (
            <div className="mb-20">
               <button 
                onClick={() => setCurrentView('dashboard')}
                className="mb-8 flex items-center text-slate-500 hover:text-orange-600 font-black text-xs uppercase tracking-widest transition"
               >
                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                 Back to Question Bank
               </button>
               <StudyMaterial />
            </div>
          ) : (
            <>
              <section className="mb-16 bg-gradient-to-br from-slate-900 via-orange-950 to-orange-800 rounded-[3rem] p-10 md:p-20 text-white shadow-[0_20px_50px_-12px_rgba(234,88,12,0.3)] overflow-hidden relative border-4 border-white/5">
                <div className="relative z-10 max-w-4xl">
                  <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-5 py-2 rounded-2xl text-xs font-black mb-8 border border-white/10 uppercase tracking-[0.2em]">
                     <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                     <span>Free Study Material & One-Liners Added</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
                    Master History with <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Mohit Sir</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-300 font-medium mb-12 leading-relaxed max-w-2xl">
                    यूपीएचईएससी और नेट जेआरएफ के लिए सबसे सटीक अध्ययन सामग्री और पिछले 25 वर्षों के हल प्रश्न पत्र।
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <button onClick={() => setCurrentView('study-material')} className="bg-white text-slate-900 px-10 py-5 rounded-[1.5rem] font-black shadow-2xl hover:bg-orange-50 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center group">
                      <span>Open Study Notes</span>
                      <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                    </button>
                    <button onClick={() => setIsDailyChallengeOpen(true)} className="bg-white/10 backdrop-blur-md text-white px-8 py-5 rounded-[1.5rem] font-black hover:bg-white/20 transition">Daily Free Quiz</button>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-3 space-y-8 sticky top-28">
                  <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
                    <h3 className="font-black text-slate-800 text-lg mb-8 flex items-center uppercase tracking-widest text-xs">
                      <span className="bg-orange-600 w-1.5 h-6 rounded-full mr-3"></span>
                      Academy Sections
                    </h3>
                    <div className="space-y-4">
                      {/* Priority Free Bank */}
                      <button
                        onClick={() => setActiveCategory('mega-bank')}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all group relative overflow-hidden flex items-center space-x-3 ${
                          activeCategory === 'mega-bank' 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]' 
                            : 'bg-blue-50 border-blue-100 hover:border-blue-300 hover:shadow-md text-blue-700'
                        }`}
                      >
                        <div className="relative z-10">
                          <div className="font-black text-sm mb-1 leading-tight uppercase tracking-tighter">Free Question Bank</div>
                          <div className={`text-[9px] font-bold uppercase tracking-wider ${activeCategory === 'mega-bank' ? 'text-blue-200' : 'text-blue-500'}`}>
                            20,000+ Detailed Solutions
                          </div>
                        </div>
                      </button>

                      {/* Premium Test Series */}
                      <button
                        onClick={() => setActiveCategory('premium')}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all group relative overflow-hidden flex items-center space-x-3 ${
                          activeCategory === 'premium' 
                            ? 'bg-indigo-900 border-indigo-900 text-white shadow-xl scale-[1.02]' 
                            : 'bg-indigo-50 border-indigo-100 hover:border-indigo-300 hover:shadow-md text-indigo-700'
                        }`}
                      >
                        <div className="relative z-10">
                          <div className="font-black text-sm mb-1 leading-tight uppercase tracking-tighter">Premium Test Series</div>
                          <div className={`text-[9px] font-bold uppercase tracking-wider ${activeCategory === 'premium' ? 'text-indigo-300' : 'text-indigo-500'}`}>
                            Requires Paid Access
                          </div>
                        </div>
                      </button>
                      
                      <div className="h-px bg-slate-100 my-2"></div>

                      {/* All other categories */}
                      {CATEGORIES.filter(c => c.id !== 'mega-bank').map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                          className={`w-full text-left p-5 rounded-2xl border-2 transition-all group relative overflow-hidden ${
                            activeCategory === cat.id 
                              ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-[1.02]' 
                              : 'bg-white border-slate-50 hover:border-orange-200 hover:shadow-md'
                          }`}
                        >
                          <div className="relative z-10">
                            <div className="font-black text-sm mb-1 leading-tight">{cat.title}</div>
                            <div className={`text-[10px] font-bold uppercase tracking-wider ${activeCategory === cat.id ? 'text-orange-400' : 'text-slate-400'}`}>
                              {cat.count.toLocaleString()} Qs Bank
                            </div>
                          </div>
                        </button>
                      ))}

                      {/* Bookmarks */}
                      <button
                        onClick={() => setActiveCategory(activeCategory === 'bookmarks' ? null : 'bookmarks')}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all group relative overflow-hidden flex items-center space-x-3 ${
                          activeCategory === 'bookmarks' 
                            ? 'bg-orange-600 border-orange-600 text-white shadow-xl scale-[1.02]' 
                            : 'bg-orange-50 border-orange-100 hover:border-orange-300 hover:shadow-md text-orange-700'
                        }`}
                      >
                        <svg className={`w-5 h-5 ${activeCategory === 'bookmarks' ? 'fill-current' : 'fill-none'}`} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <div className="relative z-10">
                          <div className="font-black text-sm mb-1 leading-tight">My Bookmarks</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-8" id="questions">
                  {activeCategory === 'premium' ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="font-black text-2xl text-slate-800 flex items-center">
                          <span className="bg-indigo-600 w-1.5 h-8 rounded-full mr-4"></span>
                          Premium Mock Test Series
                        </h3>
                      </div>
                      
                      {!user?.isPremium && (
                        <div className="bg-indigo-950 text-white p-10 rounded-[2.5rem] mb-8 shadow-2xl relative overflow-hidden">
                          <div className="relative z-10">
                            <h4 className="font-black text-2xl mb-4">Locked Section 🔐</h4>
                            <p className="text-indigo-200 text-sm mb-8 leading-relaxed font-medium">प्रीमियम टेस्ट सीरीज के लिए भुगतान करें। एडमिन द्वारा अनुमति मिलते ही सभी 20 पेपर खुल जाएंगे।</p>
                            <div className="flex flex-col md:flex-row gap-4">
                              <button onClick={handleNotifyPayment} className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-900/40 transition active:scale-95 flex items-center justify-center">
                                Notify Admin After Payment
                              </button>
                            </div>
                          </div>
                          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-6">
                        {PREMIUM_EXAMS.map(exam => (
                          <div key={exam.id} className={`bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm transition group hover:shadow-xl ${!user?.isPremium ? 'opacity-50 cursor-not-allowed filter grayscale' : ''}`}>
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <h4 className="text-xl font-black text-slate-800 mb-1">{exam.title}</h4>
                                <p className="text-xs text-slate-400 font-medium">{exam.description}</p>
                              </div>
                            </div>
                            <button 
                              disabled={!user?.isPremium}
                              onClick={() => setActiveExam(exam)}
                              className={`w-full py-4 rounded-xl font-black text-xs tracking-[0.2em] transition ${user?.isPremium ? 'bg-indigo-600 text-white hover:bg-black shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400 cursor-not-allowed'}`}
                            >
                              {user?.isPremium ? 'START TEST SERIES' : 'PERMISSION PENDING'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100">
                        <div className="flex-grow relative">
                          <input 
                            type="text" 
                            placeholder={`Search in ${activeCategory === 'mega-bank' ? 'Free Mega Bank' : 'History Bank'}...`} 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-orange-500 transition font-medium text-sm"
                          />
                          <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {filteredQuestions.length > 0 ? (
                          filteredQuestions.map((q) => (
                            <QuestionCard key={q.id} question={q} />
                          ))
                        ) : (
                          <div className="bg-white rounded-[3rem] p-20 text-center border-4 border-dashed border-slate-100 animate-in fade-in duration-500">
                             <div className="text-4xl mb-4">📂</div>
                             <p className="text-slate-500 font-black uppercase tracking-widest text-sm">No historical data found in this category</p>
                             <button 
                               onClick={() => { setActiveCategory('mega-bank'); setSearchQuery(''); }}
                               className="mt-6 text-orange-600 font-bold text-xs uppercase tracking-widest hover:underline"
                             >
                               Back to Free Mega Bank
                             </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="lg:col-span-3 space-y-10 sticky top-28">
                  <ChatBot />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
