import React from 'react';
import { Icons } from '../ui/Icons';
import { CATEGORIES } from '../../data/mockData';
import { GlassCard } from '../dashboard/DashboardComponents';
import { useFinancials } from '../../context/FinanceContext';

export default function TransactionModal({ 
    isOpen, 
    onClose, 
    onSubmit, 
    editingId, 
    formTx, 
    setFormTx 
}) {
    const { role } = useFinancials();

    // Guard clause: Only show if open and user is Admin
    if (!isOpen || role !== 'admin') return null;

    return (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <GlassCard className="w-full max-w-md p-8 relative border-emerald-500/30 animate-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">{editingId ? 'Modify Entry' : 'New Financial Log'}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white cursor-pointer">
                        <Icons.X size={20} />
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Description</label>
                        <input 
                            required 
                            type="text" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-emerald-500 outline-none" 
                            value={formTx.description} 
                            onChange={(e) => setFormTx({ ...formTx, description: e.target.value })} 
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Sector</label>
                        <select 
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none" 
                            value={formTx.category} 
                            onChange={(e) => setFormTx({ ...formTx, category: e.target.value })}
                        >
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Amount (USD)</label>
                            <input 
                                required 
                                type="number" 
                                step="0.01" 
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-emerald-500" 
                                value={formTx.amount} 
                                onChange={(e) => setFormTx({ ...formTx, amount: e.target.value })} 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Type</label>
                            <select 
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none" 
                                value={formTx.type} 
                                onChange={(e) => setFormTx({ ...formTx, type: e.target.value })}
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all mt-4 cursor-pointer"
                    >
                        {editingId ? 'Confirm Changes' : 'Log Transaction'}
                    </button>
                </form>
            </GlassCard>
        </div>
    );
}