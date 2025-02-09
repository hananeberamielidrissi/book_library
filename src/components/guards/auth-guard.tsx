"use client"

import { useAuth } from '@/hooks/use-auth'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export function AuthGuard({ 
  children,
  allowedRoles = ['admin', 'reader']
}: { 
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'reader')[];
}) {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || !allowedRoles.includes(user.role))) {
      redirect('/auth/login')
    }
  }, [user, isLoading, allowedRoles])

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}