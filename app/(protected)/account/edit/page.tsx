import FrontendLayout from '@/components/layouts/FrontendLayout'
import BreadCrumb from '@/components/ui/BreadCrumb'
import EditProfileForm from '@/components/user/EditProfileForm'
import { getProfile } from '@/server-actions/user/getProfile'
import React from 'react'

const page = async () => {
    const userProfile = await getProfile()
    return (
        <FrontendLayout>
            <section className='mx-auto max-w-4xl py-12'>
                <BreadCrumb
                    items={[
                        {
                            label: "Home",
                            href: "/"
                        },
                        {
                            label: "Account",
                            href: "/account"
                        },
                        {
                            label: "Edit"
                        },
                    ]}
                />

                <p className="text-muted-foreground mt-2">
                    Edit your profile.
                </p>

                <EditProfileForm
                    userProfile={userProfile}
                />
            </section>
        </FrontendLayout>
    )
}

export default page