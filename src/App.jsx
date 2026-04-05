import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import DashboardCards from './components/DashboardCards'
import Charts from './components/Charts'
import Insights from './components/Insights'
import RoleToggle from './components/RoleToggle'
import TransactionsTable from './components/TransactionsTable'
import TransactionForm from './components/TransactionForm'
import { useTransactions } from './hooks/useTransactions'

function Navigation() {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const isActive = (path) => location.pathname === path
  
  return (
    <aside className="w-full border-b border-slate-200 bg-slate-900 text-slate-100 dark:border-slate-700 md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:block md:py-5">
        <h2 className="text-lg font-semibold">Navigation</h2>
        <button
          type="button"
          onClick={() => setIsSidebarOpen((open) => !open)}
          className="rounded-md border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-800 md:hidden"
        >
          {isSidebarOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      <nav className={`${isSidebarOpen ? 'block' : 'hidden'} px-4 pb-5 md:block md:pb-6`}>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-1">
          <li className="flex-1 md:flex-none">
            <Link
              to="/"
              className={`w-full rounded-md px-4 py-2 text-left text-sm font-medium transition block ${
                isActive('/') 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li className="flex-1 md:flex-none">
            <Link
              to="/transactions"
              className={`w-full rounded-md px-4 py-2 text-left text-sm font-medium transition block ${
                isActive('/transactions') 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Transactions
            </Link>
          </li>
          <li className="flex-1 md:flex-none">
            <Link
              to="/insights"
              className={`w-full rounded-md px-4 py-2 text-left text-sm font-medium transition block ${
                isActive('/insights') 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Insights
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [userRole, setUserRole] = useState('Viewer')
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions()

  const handleAddTransaction = () => {
    console.log('handleAddTransaction called')
    setEditingTransaction(null)
    setShowTransactionForm(true)
  }

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction)
    setShowTransactionForm(true)
  }

  const handleSaveTransaction = (transactionData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transactionData)
    } else {
      addTransaction(transactionData)
    }
    setShowTransactionForm(false)
    setEditingTransaction(null)
  }

  const handleCancelTransaction = () => {
    setShowTransactionForm(false)
    setEditingTransaction(null)
  }

  const handleDeleteTransaction = (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id)
    }
  }

  const handleRoleChange = (role) => {
    console.log('App received role change:', role)
    setUserRole(role)
  }

  return (
    <Router>
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
          <div className="flex min-h-screen flex-col md:flex-row">
            <Navigation />

            <div className="flex min-h-screen flex-1 flex-col">
              <header className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Finance Dashboard</h1>
                  <button
                    type="button"
                    onClick={() => setIsDarkMode((mode) => !mode)}
                    className="w-fit rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
                <div className="mt-3">
                  <RoleToggle onAddTransaction={handleAddTransaction} onRoleChange={handleRoleChange} />
                </div>
              </header>

              <main className="flex-1 p-4 sm:p-6">
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <section className="h-full space-y-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40 sm:p-6">
                        <DashboardCards />
                        <Charts transactions={transactions} />
                        <TransactionsTable 
                          transactions={transactions} 
                          onEditTransaction={handleEditTransaction}
                          onDeleteTransaction={handleDeleteTransaction}
                          isAdmin={userRole === 'Admin'}
                        />
                        <Insights transactions={transactions} />
                      </section>
                    } 
                  />
                  <Route 
                    path="/transactions" 
                    element={
                      <section className="h-full space-y-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40 sm:p-6">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">Transactions</h2>
                        <TransactionsTable 
                          transactions={transactions} 
                          onEditTransaction={handleEditTransaction}
                          onDeleteTransaction={handleDeleteTransaction}
                          isAdmin={userRole === 'Admin'}
                        />
                      </section>
                    } 
                  />
                  <Route 
                    path="/insights" 
                    element={
                      <section className="h-full space-y-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40 sm:p-6">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">Insights</h2>
                        <Insights transactions={transactions} />
                      </section>
                    } 
                  />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </div>
      
      {showTransactionForm && (
        console.log('Rendering TransactionForm, editing:', editingTransaction),
        <TransactionForm 
          transaction={editingTransaction}
          onSave={handleSaveTransaction}
          onCancel={handleCancelTransaction}
        />
      )}
    </Router>
  )
}

export default App
