import { useState, useMemo } from 'react';
import { useFinancials } from '../context/FinanceContext';
import { Icons } from '../components/ui/Icons';

import MovementInsights from '../components/dashboard/MovementInsights';
import MetricHighlights from '../components/dashboard/MetricHighlights';

import TransactionModal from '../components/modal/TransactionModal';
import AuditReportModal from '../components/modal/AuditReportModal';

import { parseDate } from '../utils/dateHelpers';
import {
    GlassCard,
    RoleBadge
} from '../components/dashboard/DashboardComponents';

export default function Dashboard() {
    const { transactions, setTransactions, role, setRole } = useFinancials();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    // Modals
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState(null);
    const [formTx, setFormTx] = useState({
        description: '',
        amount: '',
        category: 'Tech',
        type: 'expense',
        date: new Date().toLocaleDateString('en-GB').split('/').join('-')
    });

    const totals = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
        const expenses = Math.abs(transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0));
        return { income, expenses, balance: income - expenses };
    }, [transactions]);

    const filteredData = useMemo(() => {
        return transactions.filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
            return matchesSearch && matchesCategory;
        }).sort((a, b) => parseDate(b.date) - parseDate(a.date));
    }, [transactions, searchTerm, filterCategory]);

    const insights = useMemo(() => {
        const expenseTxs = transactions.filter(t => t.type === 'expense');
        const categoryTotals = expenseTxs.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
            return acc;
        }, {});
        const highestCat = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

        return {
            highestCategory: highestCat ? highestCat[0] : 'N/A',
            monthlySavingRate: totals.income > 0 ? ((totals.income - totals.expenses) / totals.income * 100).toFixed(1) : 0,
            transactionCount: transactions.length,
            avgExpense: expenseTxs.length > 0 ? (totals.expenses / expenseTxs.length).toFixed(2) : 0
        };
    }, [transactions, totals]);

    // Handlers
    const handleEditInit = (tx) => {
        setEditingId(tx.id);
        setFormTx({ ...tx, amount: Math.abs(tx.amount).toString() });
        setIsFormModalOpen(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const finalAmount = formTx.type === 'expense' ? -Math.abs(parseFloat(formTx.amount)) : Math.abs(parseFloat(formTx.amount));

        if (editingId) {
            setTransactions(prev => prev.map(t => t.id === editingId ? { ...formTx, amount: finalAmount, id: editingId } : t));
        } else {
            setTransactions(prev => [{ ...formTx, amount: finalAmount, id: Date.now() }, ...prev]);
        }
        resetForm();
    };

    const resetForm = () => {
        setIsFormModalOpen(false);
        setEditingId(null);
        setFormTx({ description: '', amount: '', category: 'Tech', type: 'expense', date: new Date().toLocaleDateString('en-GB').split('/').join('-') });
    };

    const handleExportJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "findash_audit_report.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="p-4 md:p-8 lg:p-12 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Executive Summary</h1>
                        <RoleBadge role={role} />
                    </div>
                    <p className="text-slate-400 text-sm">Automated auditing and capital management.</p>
                </div>

                <div className="flex items-center gap-3">
                    <GlassCard className="flex p-1 gap-1">
                        <button onClick={() => setRole('admin')} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${role === 'admin' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}>Admin</button>
                        <button onClick={() => setRole('viewer')} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${role === 'viewer' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}>Viewer</button>
                    </GlassCard>
                    <GlassCard className="flex items-center px-4 py-2 gap-2 border-white/5 focus-within:border-emerald-500/50 transition-colors">
                        <Icons.Search size={18} className="text-slate-400" />
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Filter activity..." className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-slate-500" />
                    </GlassCard>
                </div>
            </header>

            <MetricHighlights totals={totals} transactions={transactions} />

            <MovementInsights 
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filteredData={filteredData}
                handleEditInit={handleEditInit}
                setIsFormModalOpen={setIsFormModalOpen}
                insights={insights}
                setIsReportOpen={setIsReportOpen}
            />

            {/* Transaction Modal */}
            <TransactionModal 
                isOpen={isFormModalOpen}
                onClose={resetForm}
                onSubmit={handleFormSubmit}
                editingId={editingId}
                formTx={formTx}
                setFormTx={setFormTx}
            />

            {/* Audit report modal */}
            <AuditReportModal 
                isOpen={isReportOpen}
                onClose={() => setIsReportOpen(false)}
                handleExportJSON={handleExportJSON}
                insights={insights}
                totals={totals}
            />
        </div>
    );
}