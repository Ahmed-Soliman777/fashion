import FrontendLayout from '@/components/layouts/FrontendLayout'
import BreadCrumb from '@/components/ui/BreadCrumb'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { FiMapPin, FiPackage, FiUser } from 'react-icons/fi'

const page = () => {
    return (
        <FrontendLayout>
            <section className="mx-auto max-w-5xl py-12">
                <div>
                    <BreadCrumb
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Account" },
                        ]}
                    />

                    <p className="text-muted-foreground mt-2">
                        Manage your profile, orders and account.
                    </p>
                </div>

                <div className="mt-10 space-y-6">
                    {/* profile */}
                    <div className="rounded-2xl border border-border p-6">
                        <div className="mb-6 flex items-center gap-3">
                            <FiUser
                                className='text-primary'
                                size={22}
                            />
                            <h2 className="text-xl font-semibold">
                                Profile Information
                            </h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Full Name
                                </p>
                                <p className="font-medium">
                                    John Doe
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Email
                                </p>
                                <p className="font-medium">
                                    john@mail.com
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Phone
                                </p>
                                <p className="font-medium">
                                    +23 812 35 6578
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Member Since
                                </p>
                                <p className="font-medium">
                                    January 2026
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center gap-4">
                            <Link href='/account/edit'>
                                <Button
                                    leftIcon={<FaUser />}
                                >
                                    Edit Profile
                                </Button>
                            </Link>
                            <Link href='/account/orders'>
                                <Button
                                    variant='outline'
                                    leftIcon={<FiPackage />}
                                >
                                    My Orders
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* address */}
                    <div className="rounded-2xl border border-border p-6">
                        <div className="flex items-center gap-3">
                            <FiMapPin
                                className='text-primary'
                                size={22}
                            />

                            <h2 className="text-xl font-semibold">
                                Shipping Address
                            </h2>
                        </div>

                        <div className="space-y-1">
                            <p>Street</p>
                            <p>City</p>
                            <p>Country</p>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    )
}

export default page