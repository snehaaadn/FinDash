import React from 'react';
import { GlassCard } from '../dashboard/DashboardComponents';

export default function AnalyticsMetrics({ currentMonth, topCategory }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="p-6 bg-linear-to-br from-slate-900 to-blue-900/20">
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">Current Income</p>
                <h3 className="text-2xl font-bold text-blue-500">₹{currentMonth.income.toLocaleString()}</h3>
            </GlassCard>
            
            <GlassCard className="p-6 bg-linear-to-br from-slate-900 to-rose-900/20">
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">Current Expenses</p>
                <h3 className="text-2xl font-bold text-rose-500">₹{currentMonth.expense.toLocaleString()}</h3>
            </GlassCard>
            
            <GlassCard className="p-6 bg-linear-to-br from-slate-900 to-emerald-900/20">
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">Savings Rate</p>
                <h3 className="text-2xl font-bold text-emerald-400">
                    {currentMonth.income > 0 ? Math.round(((currentMonth.income - currentMonth.expense) / currentMonth.income) * 100) : 0}%
                </h3>
            </GlassCard>
            
            <GlassCard className="p-6 bg-linear-to-br from-slate-900 to-amber-500/20">
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">Top Sector</p>
                <h3 className="text-2xl font-bold text-amber-400 uppercase truncate">{topCategory[0]}</h3>
            </GlassCard>
        </div>
    );
}