import { useState } from 'react'

function formatAmount(amount) {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function TransactionsTable({ transactions = [], onEditTransaction, onDeleteTransaction, isAdmin = false }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesCategory = transaction.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim())
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter

    return matchesCategory && matchesType
  })

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Recent Transactions</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by category"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-slate-500 dark:focus:ring-slate-700"
          />
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-slate-500 dark:focus:ring-slate-700"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Date
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Amount
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Category
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Type
              </th>
              {isAdmin && (
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-slate-800">
            {filteredTransactions.map((transaction) => {
              const isIncome = transaction.type === 'income'

              return (
                <tr key={transaction.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="whitespace-nowrap px-5 py-3 text-sm text-slate-700 dark:text-slate-300">
                    {transaction.date}
                  </td>
                  <td
                    className={`whitespace-nowrap px-5 py-3 text-sm font-medium ${
                      isIncome ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isIncome ? '+' : '-'}
                    {formatAmount(transaction.amount)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-sm text-slate-700 dark:text-slate-300">
                    {transaction.category}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        isIncome
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="whitespace-nowrap px-5 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEditTransaction(transaction)}
                          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteTransaction(transaction.id)}
                          className="rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-100 dark:border-rose-600 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? "5" : "4"} className="px-5 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TransactionsTable
