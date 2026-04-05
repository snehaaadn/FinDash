import { useMemo } from 'react';
import { useFinancials } from '../context/FinanceContext'; 

import AnalyticsMetrics from '../components/analytics/AnalyticsMetrics';
import ComparitiveTrends from '../components/analytics/ComparitiveTrends';
import SectorConcentration from '../components/analytics/SectorConcentration';

export default function Reports() {
    const { transactions } = useFinancials(); 

    const monthlyStats = useMemo(() => {
        const months = {};
        if (!transactions) return [];

        transactions.forEach(t => {
            const [day, month, year] = t.date.split('-');
            const monthKey = `${year}-${month}`;
            if (!months[monthKey]) {
                months[monthKey] = { income: 0, expense: 0, categories: {}, name: `${month}/${year}` };
            }
            if (t.type === 'income') {
                months[monthKey].income += t.amount;
            } else {
                const absAmount = Math.abs(t.amount);
                months[monthKey].expense += absAmount;
                months[monthKey].categories[t.category] = (months[monthKey].categories[t.category] || 0) + absAmount;
            }
        });

        const sorted = Object.entries(months)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([key, val]) => val);

        return sorted;
    }, [transactions]);

    const currentMonth = monthlyStats[0] || { income: 0, expense: 0, categories: {}, name: 'N/A' };
    const prevMonth = monthlyStats[1];

    const topCategory = useMemo(() => {
        if (!currentMonth.categories || Object.keys(currentMonth.categories).length === 0) return ['None', 0];
        return Object.entries(currentMonth.categories)
            .sort((a, b) => b[1] - a[1])[0];
    }, [currentMonth]);

    return (
        <div className="p-4 md:p-8 lg:p-12 space-y-10 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Monthly Analytics</h1>
                    <p className="text-slate-400 text-sm">Deep dive into your spending DNA and monthly flow.</p>
                </div>
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    Report Period: {currentMonth.name}
                </div>
            </header>

            {/* Metrics Grid */}
            <AnalyticsMetrics 
                currentMonth={currentMonth} 
                topCategory={topCategory} 
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <ComparitiveTrends 
                    monthlyStats={monthlyStats}
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    topCategory={topCategory}
                />

                <SectorConcentration 
                    currentMonth={currentMonth}
                    topCategory={topCategory}
                />
            </div>
        </div>
    );
}