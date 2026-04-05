import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function Charts({ transactions = [] }) {
  const pieColors = ['#0ea5e9', '#14b8a6', '#f97316', '#a855f7', '#f43f5e', '#22c55e']

  const balanceTrendData = transactions.reduce((acc, transaction) => {
    const previousBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0
    const nextBalance =
      transaction.type === 'income'
        ? previousBalance + transaction.amount
        : previousBalance - transaction.amount

    acc.push({
      date: transaction.date.slice(5),
      balance: Number(nextBalance.toFixed(2)),
    })

    return acc
  }, [])

  const spendingByCategory = Object.values(
    transactions.reduce((acc, transaction) => {
      if (transaction.type !== 'expense') {
        return acc
      }

      if (!acc[transaction.category]) {
        acc[transaction.category] = { name: transaction.category, value: 0 }
      }

      acc[transaction.category].value += transaction.amount
      return acc
    }, {})
  ).map((item) => ({
    ...item,
    value: Number(item.value.toFixed(2)),
  }))

  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Balance Trend</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Income and expense impact over time.</p>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceTrendData}>
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#f1f5f9' }}
                itemStyle={{ color: '#f1f5f9' }}
                className="dark:tooltip-dark"
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Spending by Category</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Expense distribution across categories.</p>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingByCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
                label
              >
                {spendingByCategory.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#f1f5f9' }}
                itemStyle={{ color: '#f1f5f9' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  )
}

export default Charts
