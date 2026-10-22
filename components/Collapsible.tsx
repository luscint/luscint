'use client'

import React, { useState } from 'react'

interface Props {
  title?: string
  initiallyCollapsed?: boolean
  children: React.ReactNode
}

export default function Collapsible({ title, initiallyCollapsed = true, children }: Props) {
  const [open, setOpen] = useState(!initiallyCollapsed)
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-sm text-brand-blue hover:text-brand-dark border border-brand-blue hover:border-brand-dark px-3 py-1 rounded transition-colors"
        aria-expanded={open}
      >
        {open ? 'Hide' : (title ? `Show ${title}` : 'Show')}
      </button>
      {open && (
        <div className="mt-3">
          {children}
        </div>
      )}
    </div>
  )
}

