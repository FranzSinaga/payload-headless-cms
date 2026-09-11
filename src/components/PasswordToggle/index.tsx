'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const typeProp = Object.getOwnPropertyDescriptor(
  typeof HTMLInputElement === 'undefined' ? {} : HTMLInputElement.prototype,
  'type',
)

/**
 * Show/hide eye button inside the login form's password input. Rendered via
 * admin.components.afterLogin in payload.config.ts — Payload's LoginForm has
 * no slot inside the field, so the button is portalled next to the input.
 */
export const PasswordToggle: React.FC = () => {
  const [input, setInput] = useState<HTMLInputElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = document.querySelector<HTMLInputElement>('.login__form input[name="password"]')
    if (!el || !typeProp?.set) return

    // React re-assigns `input.type` on every re-render (each keystroke), which
    // would snap a revealed password back to dots. Swallow React's writes on
    // this one element; the toggle writes through the prototype setter.
    Object.defineProperty(el, 'type', {
      configurable: true,
      get: () => typeProp.get?.call(el),
      set: () => {},
    })
    setInput(el)

    return () => {
      delete (el as Partial<HTMLInputElement>).type
      typeProp.set?.call(el, 'password')
    }
  }, [])

  useEffect(() => {
    if (input) typeProp?.set?.call(input, visible ? 'text' : 'password')
  }, [input, visible])

  if (!input?.parentElement) return null

  return createPortal(
    <button
      aria-controls={input.id}
      aria-label={visible ? 'Hide password' : 'Show password'}
      aria-pressed={visible}
      className="password-toggle"
      onClick={() => setVisible((v) => !v)}
      type="button"
    >
      <svg
        aria-hidden="true"
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
        width="18"
      >
        {visible ? (
          <>
            <path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-2.16 3.19" />
            <path d="M6.61 6.61A18 18 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.39-1.61" />
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="m2 2 20 20" />
          </>
        ) : (
          <>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </>
        )}
      </svg>
    </button>,
    input.parentElement,
  )
}

export default PasswordToggle
