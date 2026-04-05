import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

const FinancialContext = createContext();

export function FinancialProvider({ children }) {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('vantage_transactions');
        return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    });

    const [role, setRole] = useState(() => {
        const saved = localStorage.getItem('vantage_role');
        return saved ? saved : 'admin';
    });

    // NEW RESET FUNCTION
    const resetToDefaults = () => {
        localStorage.removeItem('vantage_transactions');
        setTransactions(INITIAL_TRANSACTIONS);
        window.location.reload(); // Refresh to ensure all charts recalculate correctly
    };

    useEffect(() => {
        localStorage.setItem('vantage_transactions', JSON.stringify(transactions));
        localStorage.setItem('vantage_role', role);
    }, [transactions, role]);

    const value = { transactions, setTransactions, role, setRole, resetToDefaults };

    return (
        <FinancialContext.Provider value={value}>
            {children}
        </FinancialContext.Provider>
    );
}

export const useFinancials = () => useContext(FinancialContext);