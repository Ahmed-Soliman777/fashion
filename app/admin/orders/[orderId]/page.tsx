import OrderStatusCard from "@/components/order/OrderStatusCard"
import { getAdminOrders } from "@/server-actions/order/getAdminOrders"
import Image from "next/image"
import { notFound } from "next/navigation"

interface OrderDetailsPageProps {
    params: Promise<{
        orderId: string
    }>
}

const page = async ({ params }: OrderDetailsPageProps) => {

    const { orderId } = await params

    const order = await getAdminOrders(Number(orderId))

    if (!order) {
        notFound()
    }

    return (
        <section>
            <div>
                <h2 className="text-3xl font-semibold">Order #{order.orderNumber}</h2>

                <p className="mt-2 text-muted-foreground">
                    Placed on {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long"
                    }).format(order.createdAt)}
                </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
                {/* left side */}
                <div className="space-y-8">
                    {/* customer */}
                    <div className="rounded-2xl border border-border bg-background p-6">
                        <h2 className="text-lg font-semibold">Customer Information</h2>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Name
                                </p>
                                <p className="mt-1 font-medium">
                                    {order.customer.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Email
                                </p>
                                <p className="mt-1 font-medium">
                                    {order.customer.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Phone
                                </p>
                                <p className="mt-1 font-medium">
                                    {order.customer.phone}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Address
                                </p>
                                <p className="mt-1 font-medium">
                                    {order.address.street}
                                    <br />
                                    {order.address.city}, {order.address.state}
                                    <br />
                                    {order.address.country}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* product */}
                    <div className="rounded-2xl border border-border bg-background p-6">
                        <div className="border-b border-border">
                            <h2 className="text-lg font-semibold">
                                Orders Items
                            </h2>
                        </div>

                        <div className="divide-y divide-border">
                            {
                                order.items.map(product => (

                                    <div
                                        key={product.id}
                                        className="flex items-center gap-5 p-6">
                                        <Image
                                            src={product.image}
                                            alt={product?.name || ""}
                                            width={80}
                                            height={90}
                                            className="rounded-lg object-cover"
                                        />

                                        <div className="flex-1">
                                            <h3 className="font-semibold">
                                                {product.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Size: {product.size}
                                            </p>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Quantity: {product.quantity}
                                            </p>
                                        </div>

                                        <div className="font-semibold">
                                            ${(product.price * product.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className="space-y-8">
                    {/* status */}
                    <OrderStatusCard
                        orderId={order.id}
                        status={order.status}
                    />

                    {/* summary */}
                    <div className="rounded-2xl border border-border bg-background p-6">
                        <h2 className="text-lg font-semibold">Order Summary</h2>

                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Shipping
                                </span>
                                <span>${order.shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Tax
                                </span>
                                <span>${order.tax.toFixed(2)}</span>
                            </div>

                            <div className="border-t border-border pt-4 flex justify-between text-lg font-semibold">
                                <span className="text-muted-foreground">
                                    Total
                                </span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* payment */}
                    <div className="rounded-2xl border border-border bg-background p-6">
                        <h2 className="text-lg font-semibold">Payment</h2>

                        <div className="mt-5 flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Method
                            </span>
                            <span>
                                {order.paymentMethod}
                            </span>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Status
                            </span>
                            <span>
                                {order.paymentStatus}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page