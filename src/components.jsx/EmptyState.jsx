import React from 'react'

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
        📝
      </div>

      <h2 className="text-lg font-medium text-zinc-900">
        No notes yet
      </h2>

      <p className="mt-1 max-w-sm text-sm text-zinc-500">
        Capture your thoughts, ideas, or reminders.  
        Your notes will appear here.
      </p>

      <button
        onClick={onAddClick}
        className="mt-6 rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Create your first note
      </button>
    </div>
  )
}

export default EmptyState
