import React from 'react';
import { 
    GlassCard, 
    BalanceTrendChart, 
    IncomeExpenseBarChart 
} from './DashboardComponents';

export default function MetricHighlights({ totals, transactions }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Main Charts Card */}
            <GlassCard className="p-6 md:col-span-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-widest">Total Net Worth</p>
                        <h2 className="text-4xl font-bold text-white tracking-tight">₹{totals.balance.toLocaleString()}</h2>
                        <BalanceTrendChart data={transactions} />
                    </div>
                    <div className="border-l border-white/5 pl-8">
                        <p className="text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-widest">Inflow vs Outflow</p>
                        <IncomeExpenseBarChart data={transactions} />
                    </div>
                </div>
            </GlassCard>

            {/* Status Cards */}
            <div className="space-y-6">
                <GlassCard className="p-8 relative h-[calc(50%-12px)] flex flex-col justify-center bg-linear-to-br from-slate-950 to-blue-900/30">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-2">Capital Inflow</p>
                    <h2 className="text-4xl font-bold text-blue-500 tracking-tighter">₹{totals.income.toLocaleString()}</h2>
                </GlassCard>

                <GlassCard className="p-8 relative h-[calc(50%-12px)] flex flex-col justify-center bg-linear-to-br from-slate-950 to-rose-900/30">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-2">Capital Outflow</p>
                    <h2 className="text-4xl font-bold text-rose-500 tracking-tighter">₹{totals.expenses.toLocaleString()}</h2>
                </GlassCard>
            </div>
        </div>
    );
}