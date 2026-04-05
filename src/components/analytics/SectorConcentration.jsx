import React from 'react';
import { GlassCard } from '../dashboard/DashboardComponents';

export default function SectorConcentration({ currentMonth, topCategory }) {
    return (
        <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Sector Concentration</h3>
            <GlassCard className="p-8 space-y-6">
                <div className="space-y-4">
                    {Object.entries(currentMonth.categories).sort((a, b) => b[1] - a[1]).map(([cat, amt], i) => (
                        <div key={cat} className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400 font-medium uppercase tracking-widest">{cat}</span>
                                <span className="text-white font-bold">₹{amt.toLocaleString()}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-1000 ${i === 0 ? 'bg-rose-500' : 'bg-slate-500'}`} 
                                    style={{ width: `${(amt / currentMonth.expense) * 100}%` }} 
                                />
                            </div>
                        </div>
                    ))}
                    {Object.keys(currentMonth.categories).length === 0 && (
                        <p className="text-xs text-slate-500 text-center py-10 italic">No outflow data for this period.</p>
                    )}
                </div>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <p className="text-[9px] text-emerald-400 font-black uppercase tracking-widest mb-1">Efficiency Note</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                        You allocated <span className="text-white font-bold">{Math.round((topCategory[1] / currentMonth.expense) * 100) || 0}%</span> of your budget to <span className="text-white font-bold uppercase">{topCategory[0]}</span> this month.
                    </p>
                </div>
            </GlassCard>
        </div>
    );
}