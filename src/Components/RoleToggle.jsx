import { useState } from 'react'

function RoleToggle({ onAddTransaction, onRoleChange }) {
  const [role, setRole] = useState('Viewer')

  const handleRoleChange = (newRole) => {
    console.log('Role changing to:', newRole)
    setRole(newRole)
    onRoleChange(newRole)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span className="font-medium">Role:</span>
        <select
          value={role}
          onChange={(event) => handleRoleChange(event.target.value)}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-slate-500 dark:focus:ring-slate-700"
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
      </label>

      {role === 'Admin' && (
        <button
          type="button"
          onClick={() => {
    console.log('Add Transaction button clicked')
    onAddTransaction()
  }}
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Add Transaction
        </button>
      )}
    </div>
  )
}

export default RoleToggle
