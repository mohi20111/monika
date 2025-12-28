
import React, { useState } from 'react';
import { STUDY_MATERIALS } from '../constants';

const StudyMaterial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Ancient' | 'Medieval' | 'Modern' | 'World'>('Ancient');

  const filteredNotes = STUDY_MATERIALS.filter(note => 
    activeTab === 'Ancient' ? note.subject === 'Ancient' : 
    activeTab === 'Medieval' ? note.subject === 'Medieval' : 
    note.subject === 'Modern'
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Master Study Notes</h2>
        <p className="text-lg text-slate-500 font-medium">मोहित सर द्वारा तैयार विशेष वन-लाइनर नोट्स (Free for All)</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['Ancient', 'Medieval', 'Modern'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === tab 
                ? 'bg-orange-600 text-white shadow-xl shadow-orange-100 scale-105' 
                : 'bg-white text-slate-400 hover:text-slate-800 border border-slate-100'
            }`}
          >
            {tab === 'Ancient' ? 'प्राचीन भारत' : tab === 'Medieval' ? 'मध्यकालीन भारत' : 'आधुनिक भारत'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNotes.map(note => (
          <div key={note.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center space-x-3 mb-6">
              <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
              <h3 className="text-xl font-black text-slate-800 leading-tight">{note.topic}</h3>
            </div>
            <div className="space-y-4">
              {note.facts.map((fact, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl group-hover:bg-orange-50/30 transition-colors">
                  <span className="text-orange-600 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  </span>
                  <p className="text-[15px] font-bold text-slate-700 leading-relaxed font-['Noto_Sans_Devanagari']">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
          <p className="text-slate-400 font-black uppercase tracking-widest">Coming Soon...</p>
        </div>
      )}
    </div>
  );
};

export default StudyMaterial;
