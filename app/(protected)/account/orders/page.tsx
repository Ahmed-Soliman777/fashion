import FrontendLayout from '@/components/layouts/FrontendLayout'
import BreadCrumb from '@/components/ui/BreadCrumb'
import Image from 'next/image'
import Link from 'next/link'
import { FiEye } from 'react-icons/fi'

const orders = [
    {
        id: "12345",
        image: "/product1.png",
        totalItems: 3,
        totalPrice: 259.97,
        date: "July 27, 2026",
        status: "Delivered"
    },
    {
        id: "12346",
        image: "/product2.png",
        totalItems: 1,
        totalPrice: 79.97,
        date: "July 21, 2026",
        status: "Processing"
    },
]

const page = () => {
    return (
        <FrontendLayout>
            <section className="mx-auto max-w-6xl py-12">
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
                            label: "Orders"
                        },
                    ]}
                />

                <p className="text-muted-foreground mt-2">
                    View and track your recent purchases.
                </p>

                <div className="mt-10 space-y-5">
                    {
                        orders.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col gap-6 rounded-2xl border border-border p-5 transition hover:shadow-sm md:flex-row md:items-center"
                            >
                                <Image
                                    src={order.image}
                                    alt={order.id}
                                    width={110}
                                    height={130}
                                    className='rounded-xl object-cover'
                                />

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="font-semibold text-lg">
                                            Order {order.id}
                                        </h2>

                                        <span className={`rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-700`}>
                                            Delivered
                                        </span>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-5 text-sm md:grid-cols-3">
                                        <div>
                                            <p className="text-muted-foreground">
                                                Total Items
                                            </p>
                                            <p className="mt-1 font-semibold">
                                                {
                                                    order.totalItems
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-muted-foreground">
                                                Total Price
                                            </p>
                                            <p className="mt-1 font-semibold">
                                                ${
                                                    order.totalPrice.toFixed(2)
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-muted-foreground">
                                                Order Date
                                            </p>
                                            <p className="mt-1 font-semibold">
                                                {
                                                    order.date
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/account/orders/${order.id}`}
                                >
                                    <button className="rounded-lg p-4 transition bg-surface cursor-pointer">
                                        <FiEye />
                                    </button>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </section>
        </FrontendLayout>
    )
}

export default page