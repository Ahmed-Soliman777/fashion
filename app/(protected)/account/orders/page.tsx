import FrontendLayout from '@/components/layouts/FrontendLayout'
import BreadCrumb from '@/components/ui/BreadCrumb'
import OrderStatusBadge from '@/components/ui/OrderStatusBadge'
import { getOrders } from '@/server-actions/order/getOrders'
import Image from 'next/image'
import Link from 'next/link'
import { FiEye } from 'react-icons/fi'

const page = async () => {
    const orders = await getOrders()
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
                                    alt={order.orderNumber}
                                    width={110}
                                    height={130}
                                    className='rounded-xl object-cover'
                                />

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="font-semibold text-lg">
                                            Order {order.orderNumber}
                                        </h2>

                                        <OrderStatusBadge status={order.status} />
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
                                                    order.total.toFixed(2)
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-muted-foreground">
                                                Order Date
                                            </p>
                                            <p className="mt-1 font-semibold">
                                                {
                                                    new Intl.DateTimeFormat("en-US", {
                                                        dateStyle: "medium"
                                                    }).format(order.createdAt)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/account/orders/${order.orderNumber}`}
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