import { getCurrentUser } from '@/server-actions/auth/getCurrentUser'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const currentUser = await getCurrentUser()

  if (currentUser) {
    redirect("/account")
  }

  return (
    <>
      {children}
    </>
  )
}

export default AuthLayout