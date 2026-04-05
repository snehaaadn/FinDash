import { useMemo } from 'react';
import { Icons } from '../ui/Icons';

export const GlassCard = ({ children, className = "" }) => (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl ${className}`}>
        {children}
    </div>
);

export const RoleBadge = ({ role }) => (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
        role === 'admin' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
    }`}>
        {role === 'admin' ? <Icons.ShieldCheck size={12} /> : <Icons.ShieldAlert size={12} />}
        {role.toUpperCase()}
    </div>
);

export const BalanceTrendChart = ({ data }) => {
    if (data.length < 2) {
        return (
            <div className="w-full h-32 mt-4 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/5">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Insufficient data for trend</span>
            </div>
        );
    }
    const sorted = [...data].sort((a, b) => new Date(a.date.split('-').reverse().join('-')) - new Date(b.date.split('-').reverse().join('-')));
    let currentBalance = 0;
    const points = sorted.map(t => {
        currentBalance += t.amount;
        return { balance: currentBalance };
    });
    const maxVal = Math.max(...points.map(p => p.balance));
    const minVal = Math.min(...points.map(p => p.balance));
    const range = maxVal - minVal || 1;
    const svgPoints = points.map((p, i) => ({
        x: (i / (points.length - 1)) * 400,
        y: 100 - ((p.balance - minVal) / range) * 80 - 10
    }));
    const pathD = `M ${svgPoints[0].x} ${svgPoints[0].y} ` + svgPoints.map(p => `L ${p.x} ${p.y}`).join(' ');
    const areaD = `${pathD} L ${svgPoints[svgPoints.length-1].x} 100 L 0 100 Z`;

    return (
        <div className="w-full h-32 mt-4 relative">
            <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={areaD} fill="url(#gradient)" />
                <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export const IncomeExpenseBarChart = ({ data }) => {
    const chartData = useMemo(() => {
        const daily = data.reduce((acc, t) => {
            if (!acc[t.date]) acc[t.date] = { income: 0, expense: 0 };
            if (t.type === 'income') acc[t.date].income += t.amount;
            else acc[t.date].expense += Math.abs(t.amount);
            return acc;
        }, {});
        
        return Object.entries(daily)
            .sort((a, b) => new Date(a[0].split('-').reverse().join('-')) - new Date(b[0].split('-').reverse().join('-')))
            .slice(-6);
    }, [data]);

    if (chartData.length === 0) {
        return (
            <div className="w-full h-32 mt-6 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/5">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">No flow data available</span>
            </div>
        );
    }

    const maxVal = Math.max(...chartData.flatMap(d => [d[1].income, d[1].expense]), 1);

    return (
        <div className="w-full h-32 mt-6 flex items-end justify-between gap-2 px-2">
            {chartData.map(([date, values], i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full flex items-end justify-center gap-1 h-20">
                        <div 
                            className="w-2 bg-blue-500 rounded-t-sm transition-all duration-500" 
                            style={{ height: `${(values.income / maxVal) * 100}%` }}
                        />
                        <div 
                            className="w-2 bg-rose-500 rounded-t-sm transition-all duration-500" 
                            style={{ height: `${(values.expense / maxVal) * 100}%` }}
                        />
                    </div>
                    <span className="text-[8px] text-slate-500 font-bold uppercase truncate w-full text-center">
                        {date.split('-').slice(0, 2).join('/')}
                    </span>
                </div>
            ))}
        </div>
    );
};

export const CategoryDonut = ({ transactions }) => {
    const breakdown = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'expense');
        const total = Math.abs(expenses.reduce((acc, t) => acc + t.amount, 0));
        if (total === 0) return [];
        const cats = expenses.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
            return acc;
        }, {});
        return Object.entries(cats).map(([name, value]) => ({ name, value, percent: (value / total) * 100 }));
    }, [transactions]);

    if (breakdown.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-10">
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-white/5 flex items-center justify-center">
                    <Icons.PieChart size={32} className="text-slate-700" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">No expenses<br/>to display</span>
            </div>
        );
    }

    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];
    let currentOffset = 0;

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative w-48 h-48">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    {breakdown.map((item, i) => {
                        const strokeDash = `${item.percent} ${100 - item.percent}`;
                        const offset = 100 - currentOffset;
                        currentOffset += item.percent;
                        return (
                            <circle key={item.name} cx="18" cy="18" r="15.915" fill="transparent" stroke={colors[i % colors.length]} strokeWidth="3.5" strokeDasharray={strokeDash} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter text-center leading-none">Category<br/>Split</span>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-3">
                {breakdown.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase truncate flex-1">{item.name}</span>
                        <span className="text-[10px] font-bold text-white">{Math.round(item.percent)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};