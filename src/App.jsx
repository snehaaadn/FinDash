import { useState } from 'react';
import { FinancialProvider } from './context/FinanceContext';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Sidebar from './components/layout/Sidebar';
import { Icons } from './components/ui/Icons';

export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <FinancialProvider>
            <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden relative">
                {/* Mobile Hamburger Button */}
                {!isSidebarOpen && (
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden fixed top-6 left-6 z-40 p-2 bg-emerald-500 rounded-xl text-black shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                    >
                        <Icons.Menu size={24} />
                    </button>
                )}

                {/* Sidebar with mobile state props */}
                <Sidebar 
                    currentPage={currentPage} 
                    setCurrentPage={(page) => {
                        setCurrentPage(page);
                        setIsSidebarOpen(false);
                    }} 
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                />
                
                <main className="flex-1 overflow-y-auto relative z-10 pt-16 lg:pt-0">
                    {currentPage === 'dashboard' ? <Dashboard /> : <Reports />}
                </main>

                {/* Mobile Backdrop Overlay */}
                {isSidebarOpen && (
                    <div 
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />
                )}
            </div>
        </FinancialProvider>
    );
}