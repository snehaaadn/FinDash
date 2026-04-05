import React from 'react';
import { Icons } from '../ui/Icons';
import { useFinancials } from '../../context/FinanceContext';

export default function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }) {
    const { role, resetToDefaults } = useFinancials();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Icons.LayoutDashboard },
        { id: 'reports', label: 'Analytics', icon: Icons.PieChart },
    ];

    return (
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-[#020617] border-r border-white/5 p-6 flex flex-col
            transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="flex items-center justify-between mb-10 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Icons.TrendingUp className="text-black" size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">FinDash.</span>
                </div>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden p-1 text-slate-500 hover:text-white"
                >
                    <Icons.X size={24} />
                </button>
            </div>
            
            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border ${
                            currentPage === item.id 
                            ? 'bg-white/5 text-emerald-400 border-white/10' 
                            : 'text-slate-400 hover:text-white border-transparent'
                        }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto space-y-4">
                <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            role === 'admin' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                        }`}>
                            <Icons.User size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white truncate">Session User</p>
                            <p className={`text-[9px] uppercase font-black tracking-tighter transition-colors duration-300 ${
                                role === 'admin' ? 'text-emerald-400' : 'text-blue-400'
                            }`}>
                                {role} Access
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}