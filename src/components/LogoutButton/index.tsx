'use client'

import { Link, LogOutIcon, useConfig, useTranslation } from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import React from 'react'

export const LogoutButton: React.FC = () => {
  const { t } = useTranslation()
  const {
    config: {
      admin: {
        routes: { logout: logoutRoute },
      },
      routes: { admin: adminRoute },
    },
  } = useConfig()

  return (
    <Link
      className="logout-button"
      href={formatAdminURL({ adminRoute, path: logoutRoute })}
      prefetch={false}
    >
      <LogOutIcon />
      <span>{t('authentication:logOut')}</span>
    </Link>
  )
}

export default LogoutButton
