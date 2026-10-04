import { getCurrentUser } from '@/server-actions/auth/getCurrentUser'
import { redirect } from 'next/navigation'
import React from 'react'

const ProtectedLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/signin")
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedLayout