import AdminLayout from '@/components/layouts/AdminLayout'
import { requireAdmin } from '@/server-actions/auth/require-admin'
import React from 'react'

const layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    await requireAdmin()
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    )
}

export default layout