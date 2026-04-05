import React from 'react';
import { Icons } from '../ui/Icons';
import { CATEGORIES } from '../../data/mockData';
import TransactionTable from './TransactionTable';
import { GlassCard, CategoryDonut } from './DashboardComponents';
import { useFinancials } from '../../context/FinanceContext';

export default function MovementInsights({ 
    filterCategory, 
    setFilterCategory, 
    filteredData, 
    handleEditInit, 
    setIsFormModalOpen, 
    insights, 
    setIsReportOpen 
}) {
    const { role, transactions, resetToDefaults } = useFinancials();

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* Recent Movements */}
            <div className="xl:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Recent Movements</h3>
                    <div className="flex gap-2">
                        {role === 'admin' && (
                            <button 
                                onClick={() => setIsFormModalOpen(true)} 
                                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-1.5 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 text-xs cursor-pointer"
                            >
                                <Icons.Plus size={16} /> <span>Add Entry</span>
                            </button>
                        )}
                        <select 
                            value={filterCategory} 
                            onChange={(e) => setFilterCategory(e.target.value)} 
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 outline-none hover:border-white/20 transition-colors"
                        >
                            <option value="All" className="bg-slate-900">All Categories</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button 
                    onClick={resetToDefaults}
                    className="w-full flex justify-end items-center gap-3 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-rose-400 transition-colors cursor-pointer group"
                >
                    <Icons.RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
                    <span>Reset Dashboard</span>
                </button>

                <GlassCard className="overflow-hidden">
                    <TransactionTable data={filteredData} onEdit={handleEditInit} />
                </GlassCard>
            </div>

            {/* Allocation & Insights */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Allocation Split</h3>
                <GlassCard className="p-8">
                    <CategoryDonut transactions={transactions} />
                </GlassCard>

                <GlassCard className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                            <Icons.TrendingUp size={18} />
                        </div>
                        <h4 className="text-sm font-bold text-white">Live Insights</h4>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-[11px] space-y-3 font-medium">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Saving Rate</span>
                            <span className="text-emerald-400 font-bold">{insights.monthlySavingRate}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Main Sector</span>
                            <span className="text-rose-400 font-bold">{insights.highestCategory}</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsReportOpen(true)} 
                        className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-[11px] font-bold tracking-wide transition-all border border-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        View Full Report <Icons.ArrowRight size={14} />
                    </button>
                </GlassCard>
            </div>
        </div>
    );
}