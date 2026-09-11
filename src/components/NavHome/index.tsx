'use client'

import { Link, useConfig } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import { formatAdminURL } from 'payload/shared'
import React from 'react'

const NavItem: React.FC<{ href: string; id: string; label: string }> = ({ href, id, label }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const content = (
    <>
      {isActive && <div className="nav__link-indicator" />}
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
      <NavItem href={formatAdminURL({ adminRoute, path: '' })} id="nav-home" label="Home" />
      <NavItem
        href={formatAdminURL({ adminRoute, path: accountRoute })}
        id="nav-account"
        label="Profile"
      />
    </div>
  )
}

export default NavHome
