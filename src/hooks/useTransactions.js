import { useState, useEffect } from 'react'
import { transactions as initialTransactions } from '../data/mockData'

export function useTransactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    // Load transactions from localStorage or use initial data
    const savedTransactions = localStorage.getItem('transactions')
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    } else {
      setTransactions(initialTransactions)
      localStorage.setItem('transactions', JSON.stringify(initialTransactions))
    }
  }, [])

  const saveTransactions = (newTransactions) => {
    setTransactions(newTransactions)
    localStorage.setItem('transactions', JSON.stringify(newTransactions))
  }

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: `txn-${Date.now()}`,
    }
    const newTransactions = [...transactions, newTransaction].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    )
    saveTransactions(newTransactions)
    return newTransaction
  }

  const updateTransaction = (id, updatedTransaction) => {
    const newTransactions = transactions.map(txn => 
      txn.id === id ? { ...updatedTransaction, id } : txn
    ).sort((a, b) => new Date(b.date) - new Date(a.date))
    saveTransactions(newTransactions)
    return updatedTransaction
  }

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter(txn => txn.id !== id)
    saveTransactions(newTransactions)
  }

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
