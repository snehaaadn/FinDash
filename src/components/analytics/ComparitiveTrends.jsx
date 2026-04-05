import React from 'react';
import { Icons } from '../ui/Icons';
import { GlassCard } from '../dashboard/DashboardComponents';

export default function ComparitiveTrends({ monthlyStats, currentMonth, prevMonth, topCategory }) {
    return (
        <div className="xl:col-span-2 space-y-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Comparative Trend</h3>
            <GlassCard className="p-8 relative overflow-hidden group">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1 space-y-4">
                        <div className="space-y-1">
                            <h4 className="text-white font-bold">Inflow vs Outflow Variance</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Your net position for {currentMonth.name} is 
                                <span className="text-emerald-400 font-bold"> ₹{(currentMonth.income - currentMonth.expense).toLocaleString()}</span>. 
                                {prevMonth ? ` Compared to last month, your spending is ${currentMonth.expense > prevMonth.expense ? 'up' : 'down'}.` : ' Tracking consistently.'}
                            </p>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/5">
                            <div 
                                className="h-full bg-blue-600/80 transition-all duration-1000" 
                                style={{ width: `${(currentMonth.income / (currentMonth.income + currentMonth.expense || 1)) * 100}%` }} 
                            />
                            <div 
                                className="h-full bg-rose-600/80 transition-all duration-1000" 
                                style={{ width: `${(currentMonth.expense / (currentMonth.income + currentMonth.expense || 1)) * 100}%` }} 
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                            <span className="text-blue-400">Capital Inflow</span>
                            <span className="text-rose-400">Capital Outflow</span>
                        </div>
                    </div>
                    <div className="w-full md:w-48 p-4 bg-white/5 border border-white/10 rounded-2xl text-center space-y-2">
                        <Icons.Zap className="mx-auto text-amber-400" size={24} />
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Actionable Insight</p>
                        <p className="text-xs text-white leading-tight">
                            {topCategory[1] > currentMonth.income * 0.3 ? `High alert on ${topCategory[0]} spending!` : 'Expenses are within safe thresholds.'}
                        </p>
                    </div>
                </div>
            </GlassCard>

            <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Historical Logs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {monthlyStats.map((data, i) => (
                        <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center hover:bg-white/10 transition-colors">
                            <div>
                                <p className="text-white font-bold text-sm">{data.name}</p>
                                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mt-1">Net: ₹{(data.income - data.expense).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-emerald-400 text-xs font-bold">+₹{data.income.toLocaleString()}</div>
                                <div className="text-rose-400 text-xs font-bold">-₹{data.expense.toLocaleString()}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}