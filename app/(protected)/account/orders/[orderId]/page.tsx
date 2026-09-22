import FrontendLayout from "@/components/layouts/FrontendLayout"
import BreadCrumb from "@/components/ui/BreadCrumb"
import Button from "@/components/ui/Button"
import Image from "next/image"
import Link from "next/link"
import { FaMoneyBillWave } from "react-icons/fa"
import { FiArrowLeft, FiMapPin, FiPackage } from "react-icons/fi"

const order = {
    id: "ord-8fk2p9",
    createdAt: "July 27, 2026",
    status: "pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    subtotal: 199.99,
    shipping: 0,
    tax: 10,
    total: 209.99,
    address: {
        firstName: "John",
        lastName: "Doe",
        phone: "+234 567 8901",
        street: "street name",
        city: "city name",
        country: "country"
    },
    items: [
        {
            id: "1",
            name: "Classic Denim Jacket",
            image: "/product1.png",
            price: 79.99,
            quantity: 1,
            size: "M",
            color: "Black",
        },
        {
            id: "2",
            name: "Premium Hoodie",
            image: "/product2.png",
            price: 60.00,
            quantity: 2,
            size: "L",
            color: "Brown",
        },
    ]
}

const page = () => {
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
                            label: "Orders",
                            href: "/account/orders"
                        },
                        {
                            label: order.id
                        }
                    ]}
                />

                {/* header */}
                <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-border p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link href={'/account/orders'}>
                            <Button
                                variant="outline"
                                className="md-5"
                                leftIcon={<FiArrowLeft />}
                            >
                                Back to Orders
                            </Button>
                        </Link>

                        <h2 className="text-3xl font-bold">
                            {order.id}
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Placed on {order.createdAt}
                        </p>
                    </div>

                    <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                        Pending
                    </span>
                </div>

                <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
                    {/* left */}
                    <div className="space-y-6">
                        {/* ordered items */}
                        <div className="rounded-2xl border border-border p-6">
                            <div className="flex items-center gap-3">
                                <FiPackage
                                    className="text-primary"
                                />

                                <h2 className="text-xl font-semibold">
                                    Ordered Items
                                </h2>
                            </div>

                            <div className="mt-8 space-y-6">
                                {
                                    order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex flex-col gap-5 rounded-xl border border-border p-5 sm:flex-row">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={130}
                                                height={160}
                                                className="rounded-xl object-cover"
                                            />

                                            <div className="flex flex-1 justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold">
                                                        {item.name}
                                                    </h3>

                                                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                                                        <span className="rounded-full bg-surface px-3 py-1">
                                                            Size: {item.size}
                                                        </span>
                                                        <span className="rounded-full bg-surface px-3 py-1">
                                                            Color: {item.color}
                                                        </span>
                                                        <span className="rounded-full bg-surface px-3 py-1">
                                                            Qty: {item.quantity}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-xl font-bold">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
                        {/* summary */}
                        <div className="rounded-2xl border border-border p-6">
                            <h2 className="text-2xl font-bold">
                                Order Summary
                            </h2>

                            <div className="mt-8 space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>{order.tax.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between border-t border-border pt-4 text-xl font-bold">
                                    <span>Total</span>
                                    <span>{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        {/* shipping */}
                        <div className="rounded-2xl border border-border p-6">
                            <div className="flex items-center gap-3">

                                <FiMapPin
                                    className="text-primary"
                                />

                                <h2 className="text-xl font-semibold">
                                    Shipping Address
                                </h2>

                            </div>

                            <div className="mt-5 space-y-2 text-muted-foreground">
                                <p className="font-medium text-foreground">
                                    {order.address.firstName} {order.address.lastName}
                                </p>

                                <p>
                                    {order.address.phone}
                                </p>

                                <p>
                                    {order.address.street}
                                </p>

                                <p>
                                    {order.address.city}{/*, {order.address.state}*/}
                                </p>

                                <p>
                                    {order.address.country}
                                </p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-border p-6">
                            <div className="flex items-center gap-3">

                                <FaMoneyBillWave
                                    className="text-primary"
                                />

                                <h2 className="text-xl font-semibold">
                                    Payment
                                </h2>

                            </div>

                            <div className="mt-5 space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Method
                                    </p>
                                    <p className="font-semibold">
                                        {order.paymentStatus}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                        Payment Status
                                    </p>
                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                                        {order.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    )
}

export default page