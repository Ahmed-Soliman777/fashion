import Button from "@/components/ui/Button"
import Image from "next/image"

const products = [
    {
        id: 1,
        name: "Classic Denim Jacket",
        size: "L",
        qunatity: 2,
        price: 79.99,
        image: "/product1.png"
    },
    {
        id: 2,
        name: "Premium Hoodie",
        size: "M",
        qunatity: 1,
        price: 59.99,
        image: "/product2.png"
    },
]
const page = () => {
    return (
        <section>
            <div>
                <h2 className="text-3xl font-semibold">Order #515151</h2>

                <p className="mt-2 text-muted-foreground">
                    Placed on July 17, 2026
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
                                    Jane Doe
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Email
                                </p>
                                <p className="mt-1 font-medium">
                                    Jane@mail.com
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Phone
                                </p>
                                <p className="mt-1 font-medium">
                                    +15151515151
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Address
                                </p>
                                <p className="mt-1 font-medium">
                                    25 Main Street, <br /> USA
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
                                products.map(product => (

                                    <div
                                        key={product.id}
                                        className="flex items-center gap-5 p-6">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
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
                                                Quantity: {product.qunatity}
                                            </p>
                                        </div>

                                        <div className="font-semibold">
                                            ${(product.price * product.qunatity).toFixed(2)}
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
                    <div className="rounded-2xl border border-border bg-background p-6">
                        <h2 className="text-lg font-semibold">Customer Order Status</h2>

                        <div className="mt-6">
                            <label className="mb-2 block text-sm font-medium">Status</label>
                            <select className="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none focus:border-primary">
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Shipping</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                            </select>
                        </div>

                        <Button className="mt-6 w-full">
                            Update Order
                        </Button>
                    </div>

                    {/* summary */}
                    <div className="rounded-2xl border border-border bg-background p-6">
                        <h2 className="text-lg font-semibold">Order Summary</h2>

                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span>$555</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Shipping
                                </span>
                                <span>$555</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Tax
                                </span>
                                <span>$555</span>
                            </div>

                            <div className="border-t border-border pt-4 flex justify-between text-lg font-semibold">
                                <span className="text-muted-foreground">
                                    Total
                                </span>
                                <span>$5000</span>
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
                                Stripe
                            </span>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Status
                            </span>
                            <span>
                                Paid
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page