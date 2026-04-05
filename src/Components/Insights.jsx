function formatCurrency(value) {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function Insights({ transactions = [] }) {
  const expenses = transactions.filter((transaction) => transaction.type === 'expense')

  const totalExpenses = expenses.reduce((sum, transaction) => sum + transaction.amount, 0)

  const spendingByCategory = expenses.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
    return acc
  }, {})

  const [highestCategory = 'N/A', highestAmount = 0] =
    Object.entries(spendingByCategory).sort((a, b) => b[1] - a[1])[0] || []

  const halfPoint = Math.ceil(expenses.length / 2)
  const firstHalfSpending = expenses
    .slice(0, halfPoint)
    .reduce((sum, transaction) => sum + transaction.amount, 0)
  const secondHalfSpending = expenses
    .slice(halfPoint)
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const changePercent =
    firstHalfSpending === 0
      ? 0
      : ((secondHalfSpending - firstHalfSpending) / firstHalfSpending) * 100
  const comparisonText =
    changePercent >= 0
      ? `Spending increased by ${changePercent.toFixed(1)}%`
      : `Spending decreased by ${Math.abs(changePercent).toFixed(1)}%`

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Highest Spending Category</p>
        <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{highestCategory}</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{formatCurrency(highestAmount)}</p>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Expenses This Month</p>
        <p className="mt-2 text-lg font-semibold text-rose-600">{formatCurrency(totalExpenses)}</p>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Spending Comparison</p>
        <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{comparisonText}</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Compared to the earlier period in this month.</p>
      </article>
    </section>
  )
}

export default Insights
