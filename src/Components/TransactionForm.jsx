import { useState } from 'react'

const categories = {
  income: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Part-time', 'Other Income'],
  expense: ['Food', 'Shopping', 'Transport', 'Utilities', 'Rent', 'Entertainment', 'Health', 'Coffee', 'Groceries', 'Other Expense']
}

function TransactionForm({ transaction = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    date: transaction?.date || new Date().toISOString().split('T')[0],
    amount: transaction?.amount || '',
    category: transaction?.category || '',
    type: transaction?.type || 'expense',
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Amount must be greater than 0'
    if (!formData.category) newErrors.category = 'Category is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSave({
        ...formData,
        amount: parseFloat(formData.amount)
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleTypeChange = (e) => {
    const newType = e.target.value
    setFormData(prev => ({
      ...prev,
      type: newType,
      category: '' // Reset category when type changes
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          {transaction ? 'Edit Transaction' : 'Add Transaction'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleTypeChange}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-slate-500 dark:focus:ring-slate-700"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm text-slate-700 outline-none transition focus:ring-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:ring-slate-700 ${
                errors.date ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-300 focus:border-slate-400 focus:ring-slate-200'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-rose-600">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              placeholder="0.00"
              className={`w-full rounded-md border px-3 py-2 text-sm text-slate-700 outline-none transition focus:ring-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:ring-slate-700 ${
                errors.amount ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-300 focus:border-slate-400 focus:ring-slate-200'
              }`}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-rose-600">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm text-slate-700 outline-none transition focus:ring-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:ring-slate-700 ${
                errors.category ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-300 focus:border-slate-400 focus:ring-slate-200'
              }`}
            >
              <option value="">Select a category</option>
              {categories[formData.type].map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-rose-600">{errors.category}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {transaction ? 'Update' : 'Add'} Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionForm
