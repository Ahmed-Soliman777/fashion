import AdminLayout from '@/components/layouts/AdminLayout'
import React from 'react'

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    )
}

export default layout