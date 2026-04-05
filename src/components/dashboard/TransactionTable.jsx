import { useState } from 'react';
import { Icons } from '../ui/Icons';
import { useFinancials } from '../../context/FinanceContext';
import { GlassCard } from './DashboardComponents';

export default function TransactionTable({ data, onEdit }) {
    const { role, setTransactions } = useFinancials();
    const [deleteId, setDeleteId] = useState(null);

    const confirmDelete = () => {
        setTransactions(prev => prev.filter(t => t.id !== deleteId));
        setDeleteId(null);
    };

    return (
        <div className="overflow-x-auto relative">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/5 text-slate-400 text-[9px] uppercase tracking-widest font-bold">
                        <th className="px-6 py-4">Transaction</th>
                        <th className="px-6 py-4 text-center">Date</th>
                        <th className="px-6 py-4">Sector</th>
                        <th className="px-6 py-4 text-right">Volume</th>
                        {role === 'admin' && <th className="px-6 py-4 text-center">Manage</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {data.length > 0 ? (
                        data.map((t) => (
                            <tr key={t.id} className="group hover:bg-white/2 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                        {t.type === 'income' ? <Icons.ArrowDownLeft size={14} /> : <Icons.ArrowUpRight size={14} />}
                                    </div>
                                    <span className="text-sm font-medium text-white">{t.description}</span>
                                </td>
                                <td className="px-6 py-4  font-medium text-slate-400 text-[10px]">{t.date}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-slate-800 rounded-md text-[9px] text-slate-400 border border-white/5 uppercase font-bold">{t.category}</span>
                                </td>
                                <td className={`px-6 py-4 text-sm font-bold text-right ${t.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                                    {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString()}
                                </td>
                                {role === 'admin' && (
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => onEdit(t)} className="p-1 text-cyan-500/50 hover:scale-120 duration-200 transition-all cursor-pointer"><Icons.Edit2 size={16} /></button>
                                            <button onClick={() => setDeleteId(t.id)} className="p-1 text-rose-500/50 hover:scale-120 duration-200 transition-transform cursor-pointer"><Icons.Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-20 text-center text-slate-500 text-sm italic">No records matching your criteria.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Deletion Alert Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <GlassCard className="w-full max-w-xs p-6 border-rose-500/20 text-center space-y-6">
                        <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                            <Icons.Trash2 size={24} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-white font-bold">Confirm Deletion</h3>
                            <p className="text-xs text-slate-400">Are you sure? This movement will be permanently removed from your history.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">Cancel</button>
                            <button onClick={confirmDelete} className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">Delete</button>
                        </div>
                    </GlassCard>
                </div>
            )}
        </div>
    );
}