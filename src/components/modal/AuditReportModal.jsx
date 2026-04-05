import React from 'react';
import { Icons } from '../ui/Icons';
import { GlassCard } from '../dashboard/DashboardComponents';
import { useFinancials } from '../../context/FinanceContext';

export default function AuditReportModal({ 
    isOpen, 
    onClose, 
    handleExportJSON, 
    insights, 
    totals 
}) {
    const { role, transactions } = useFinancials();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative border-emerald-500/20 animate-in fade-in zoom-in duration-300">
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-3">
                        <Icons.PieChart size={20} className="text-emerald-500" />
                        <div>
                            <h2 className="text-xl font-bold text-white">Financial Audit Report</h2>
                            <p className="text-xs text-slate-400">March 2024 • Detailed Analysis</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white cursor-pointer">
                        <Icons.X size={20} />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Logs', val: insights.transactionCount, icon: Icons.Calendar, color: 'text-blue-400' },
                            { label: 'Avg Expense', val: `₹${insights.avgExpense}`, icon: Icons.Zap, color: 'text-amber-400' },
                            { label: 'Saving Rate', val: `${insights.monthlySavingRate}%`, icon: Icons.TrendingUp, color: 'text-emerald-400' },
                            { label: 'Top Outflow', val: insights.highestCategory, icon: Icons.ArrowUpRight, color: 'text-rose-400' }
                        ].map((stat, i) => (
                            <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-2">
                                <stat.icon size={16} className={stat.color} />
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</span>
                                <span className="text-lg font-bold text-white">{stat.val}</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Inflow vs Outflow Efficiency</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-slate-400 font-medium">Income Utilization</span>
                                    <span className="text-white font-bold">{totals.income > 0 ? Math.round((totals.expenses / totals.income) * 100) : 0}%</span>
                                </div>
                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                                    <div className="h-full bg-linear-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-1000" style={{ width: `${totals.income > 0 ? Math.min((totals.expenses / totals.income) * 100, 100) : 0}%` }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Primary Inflow Sources</h4>
                                    <div className="space-y-2">
                                        {transactions.filter(t => t.type === 'income').slice(0, 3).map(t => (
                                            <div key={t.id} className="flex justify-between items-center text-xs p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                                                <span className="text-slate-300">{t.description}</span>
                                                <span className="text-emerald-400 font-bold">+₹{t.amount.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-tighter">Major Outflow Points</h4>
                                    <div className="space-y-2">
                                        {transactions.filter(t => t.type === 'expense').sort((a, b) => a.amount - b.amount).slice(0, 3).map(t => (
                                            <div key={t.id} className="flex justify-between items-center text-xs p-2 bg-rose-500/5 rounded-lg border border-rose-500/10">
                                                <span className="text-slate-300">{t.description}</span>
                                                <span className="text-rose-400 font-bold">-₹{Math.abs(t.amount).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-4">
                        <Icons.ShieldCheck className="text-blue-400 shrink-0" size={24} />
                        <p className="text-xs text-slate-300 leading-relaxed">Verified by <span className="text-blue-400 font-bold uppercase">{role}</span> profile. Compiled based on the current session logs.</p>
                    </div>
                </div>
                <div className="p-6 border-t border-white/10 flex gap-4 bg-white/5">
                    <button onClick={onClose} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold border border-white/10 transition-all cursor-pointer">Close Report</button>
                    <button onClick={handleExportJSON} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer">
                        <Icons.Download size={18} /> Export JSON
                    </button>
                </div>
            </GlassCard>
        </div>
    );
}