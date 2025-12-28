
import React, { useState, useEffect } from 'react';
import { User } from '../types';

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'premium'>('all');

  useEffect(() => {
    const loadedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    setUsers(loadedUsers);
  }, []);

  const grantAccess = (userId: string) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) return { ...u, isPremium: true, paymentRequested: false };
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
    alert('Student granted access to all Test Series!');
  };

  const revokeAccess = (userId: string) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) return { ...u, isPremium: false };
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'pending' && u.paymentRequested && !u.isPremium) || 
      (filter === 'premium' && u.isPremium);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 border border-slate-100 max-w-6xl mx-auto mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
            Master Control Panel
            <span className="ml-4 bg-orange-100 text-orange-600 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">Awasthi Sir Mode</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Verify payments and grant test series permissions</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${filter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            All Students
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition relative ${filter === 'pending' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Pending Approval
            {users.some(u => u.paymentRequested && !u.isPremium) && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
            )}
          </button>
          <button 
            onClick={() => setFilter('premium')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${filter === 'premium' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Premium Active
          </button>
        </div>
      </div>

      <div className="mb-8 relative">
        <input 
          type="text" 
          placeholder="Search student by name or email id..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-[2rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition font-medium"
        />
        <svg className="w-6 h-6 absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-inner bg-slate-50/30">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-slate-100">
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Identity</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Status</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Permission Type</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action Interface</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map(u => (
              <tr key={u.id} className="hover:bg-white transition-colors group">
                <td className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-xs shadow-md ${u.isPremium ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-slate-300'}`}>
                      {u.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{u.name}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  {u.paymentRequested && !u.isPremium ? (
                    <div className="inline-flex items-center space-x-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full animate-pulse border border-orange-100">
                      <span className="text-[9px] font-black uppercase tracking-widest">Payment Claimed</span>
                    </div>
                  ) : u.isPremium ? (
                    <div className="inline-flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                      <span className="text-[9px] font-black uppercase tracking-widest">Verified Paid</span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">No Payment History</span>
                  )}
                </td>
                <td className="p-6">
                   <div className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl inline-block ${u.isPremium ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {u.isPremium ? 'ALL TEST SERIES (FULL ACCESS)' : 'FREE CONTENT ONLY'}
                  </div>
                </td>
                <td className="p-6 text-right">
                  {!u.isPremium ? (
                    <button 
                      onClick={() => grantAccess(u.id)}
                      className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all transform active:scale-95 bg-orange-600 text-white hover:bg-black hover:shadow-lg shadow-orange-200"
                    >
                      Verify & Grant Access
                    </button>
                  ) : (
                    <button 
                      onClick={() => revokeAccess(u.id)}
                      className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 border border-transparent hover:border-red-100"
                    >
                      Revoke Permission
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
