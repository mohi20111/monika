
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-orange-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-2 md:mb-0 cursor-pointer" onClick={() => window.location.hash = 'home'}>
            <div className="bg-white p-2 rounded-full text-orange-600 font-bold text-xl">MA</div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">History with Mohit Awasthi Sir</h1>
          </div>
          <nav className="flex space-x-6 text-sm md:text-base font-semibold">
            <a href="#home" className="hover:text-orange-200 transition">Home</a>
            <a href="#questions" className="hover:text-orange-200 transition">Question Bank</a>
            <a href="#notes" className="hover:text-orange-200 transition">Study Material</a>
            <a href="#ask" className="bg-white text-orange-600 px-4 py-1.5 rounded-xl font-bold hover:bg-orange-50 transition shadow-sm">Ask AI</a>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <p className="font-black text-white text-xl mb-2">History with Mohit Awasthi Sir</p>
              <p className="text-sm max-w-xs">Your trusted platform for deep historical understanding and competitive exam success.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Resources</h4>
                <ul className="text-sm space-y-2">
                  <li><a href="#questions" className="hover:text-white transition">UGC NET Papers</a></li>
                  <li><a href="#questions" className="hover:text-white transition">UPSC History</a></li>
                  <li><a href="#notes" className="hover:text-white transition">One-Liner Notes</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Support</h4>
                <ul className="text-sm space-y-2">
                  <li><a href="#" className="hover:text-white transition text-indigo-400 font-bold" onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>Admin Portal</a></li>
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            &copy; {new Date().getFullYear()} History with Mohit Awasthi Sir. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
