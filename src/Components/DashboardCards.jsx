const cards = [
  {
    id: 'total-balance',
    title: 'Total Balance',
    amount: '$24,780.00',
    icon: '💰',
  },
  {
    id: 'income',
    title: 'Income',
    amount: '$8,420.00',
    icon: '⬆',
  },
  {
    id: 'expenses',
    title: 'Expenses',
    amount: '$3,140.00',
    icon: '⬇',
  },
]

function DashboardCards() {
  return (
    <section aria-label="Dashboard cards">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{card.amount}</p>
              </div>
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-lg dark:bg-slate-700"
                aria-hidden="true"
              >
                {card.icon}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DashboardCards
