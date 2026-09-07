import React from 'react'

/**
 * Right-hand panel on the login screen. Rendered via admin.components.beforeLogin
 * in payload.config.ts; positioned beside the form with CSS Grid in custom.scss
 * (hidden below 861px — see `.login-panel` in src/app/(payload)/custom.scss).
 */
export const BeforeLogin: React.FC = () => {
  return (
    <aside className="login-panel">
      <p className="login-panel__tagline">The backend to build the modern web.</p>
      <p className="login-panel__description">
        Payload is the open-source Next.js backend used in production by the most innovative
        companies on earth.
      </p>
    </aside>
  )
}

export default BeforeLogin
