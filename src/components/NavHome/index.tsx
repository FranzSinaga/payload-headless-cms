'use client'

import { Link, useConfig } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import { formatAdminURL } from 'payload/shared'
import React from 'react'

const NavIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    aria-hidden="true"
    className="nav-home__icon"
    fill="none"
    height="16"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="16"
  >
    {children}
  </svg>
)

const NavItem: React.FC<{ href: string; icon: React.ReactNode; id: string; label: string }> = ({
  href,
  icon,
  id,
  label,
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const content = (
    <>
      {isActive && <div className="nav__link-indicator" />}
      {icon}
      <span className="nav__link-label">{label}</span>
    </>
  )

  return isActive ? (
    <div className="nav__link" id={id}>
      {content}
    </div>
  ) : (
    <Link className="nav__link" href={href} id={id} prefetch={false}>
      {content}
    </Link>
  )
}

export const NavHome: React.FC = () => {
  const {
    config: {
      admin: {
        routes: { account: accountRoute },
      },
      routes: { admin: adminRoute },
    },
  } = useConfig()

  return (
    <div className="nav-home">
      <NavItem
        href={formatAdminURL({ adminRoute, path: '' })}
        icon={
          <NavIcon>
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
          </NavIcon>
        }
        id="nav-home"
        label="Home"
      />
      <NavItem
        href={formatAdminURL({ adminRoute, path: accountRoute })}
        icon={
          <NavIcon>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </NavIcon>
        }
        id="nav-account"
        label="Profile"
      />
    </div>
  )
}

export default NavHome
