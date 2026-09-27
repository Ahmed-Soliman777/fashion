"use client"

import FrontendLayout from "@/components/layouts/FrontendLayout"
import BreadCrumb from "@/components/ui/BreadCrumb"
import Input from "@/components/ui/Input"
import { useState } from "react"
import { FaMoneyBillWave, FaStripe } from "react-icons/fa"
import z from "zod"
import Button from "../ui/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"

const checkoutSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 charcters."),
    lastName: z.string().min(2, "Last name must be at least 2 charcters."),
    email: z.email("Please enter a valid email address."),
    phone: z.string().min(10, "Please enter a valid phone number."),
    state: z.string().min(2, "State is required."),
    city: z.string().min(2, "City is required."),
    address: z.string().min(2, "Address is required."),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

const subtotal = 199.99
const shipping = 0
const tax = subtotal * 0.08
const total = subtotal + shipping + tax

const orderItems = [
    {
        id: 1,
        name: "Classic Denim Jacket",
        image: "/product1.png",
        qunatity: 1,
        price: 79.99
    },
    {
        id: 2,
        name: "Premium Hoodie",
        image: "/product2.png",
        qunatity: 2,
        price: 59.99
    },
]

const CheckoutPageComponent = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            state: "",
            city: "",
            address: ""

        }
    })

    const router = useRouter()

    const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">("cod")

    function onSubmit(data: CheckoutFormValues) {
        console.log({ ...data, paymentMethod })
    }

    return (
        <FrontendLayout>
            <section className="mx-auto max-w-7xl py-12">
                <div className="mb-10">
                    <BreadCrumb
                        items={[
                            {
                                label: "Home",
                                href: "/"
                            },
                            {
                                label: "Cart",
                                href: "/cart"
                            },
                            {
                                label: "Checkout"
                            },
                        ]}
                    />

                    <p className="mt-2 text-muted-foreground">
                        Complete your order securely.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-10 lg:grid-cols-[2fr_1fr]">
                    {/* left */}
                    <div className="space-y-8">
                        {/* shipping address */}
                        <div className="rounded-2xl border border-border p-6">
                            <h2 className="font-semibold text-2xl">
                                Shipping Address
                            </h2>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                <Input
                                    {...register("firstName")}
                                    error={errors.firstName?.message}
                                    label="First Name"
                                    placeholder="John"
                                />
                                <Input
                                    {...register("lastName")}
                                    error={errors.lastName?.message}
                                    label="Last Name"
                                    placeholder="Doe"
                                />
                                <Input
                                    {...register("email")}
                                    error={errors.email?.message}
                                    label="Email Address"
                                    placeholder="John@mail.com"
                                />
                                <Input
                                    {...register("phone")}
                                    error={errors.phone?.message}
                                    label="Phone Number"
                                    placeholder="+20..."
                                />
                                <Input
                                    {...register("state")}
                                    error={errors.state?.message}
                                    label="State"
                                    placeholder="California"
                                />
                                <Input
                                    {...register("city")}
                                    error={errors.city?.message}
                                    label="City"
                                    placeholder="Burbank"
                                />
                                <div>
                                    <Input
                                        {...register("address")}
                                        error={errors.address?.message}
                                        label="Street Address"
                                        placeholder="No 11"
                                        variant="textarea"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* payment method */}
                        <div className="rounded-2xl border border-border p-6">
                            <h2 className="text-xl font-semibold">
                                Payment Method
                            </h2>

                            <div className="mt-6 space-y-4">
                                <button
                                    className={`flex w-full items-center rounded-xl border p-5 text-left transition ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                                    type="button"
                                    onClick={() => setPaymentMethod("cod")}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === "cod" ? "border-primary" : "border-border"}`}>

                                        </div>

                                        <FaMoneyBillWave
                                            className="text-green-600"
                                            size={24}
                                        />

                                        <div>
                                            <p className="font-semibold">Cash on Delivery</p>
                                            <p className="text-sm text-muted-foreground">Pay when your order arrives.</p>
                                        </div>
                                    </div>
                                </button>
                                <button
                                    className={`flex w-full items-center rounded-xl border p-5 text-left transition ${paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                                    type="button"
                                    onClick={() => setPaymentMethod("stripe")}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === "stripe" ? "border-primary" : "border-border"}`}>

                                        </div>

                                        <FaStripe
                                            className="text-indigo-600"
                                            size={30}
                                        />

                                        <div>
                                            <p className="font-semibold">Cash on Delivery</p>
                                            <p className="text-sm text-muted-foreground">Visa, Mastercard and more.</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="rounded-2xl border border-border p-6 h-fit">
                        <h2 className="text-2xl font-bold">
                            Order Summary
                        </h2>

                        <div className="mt-6 space-y-5">

                            {
                                orderItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={70}
                                            height={85}
                                            className="rounded-lg"
                                        />

                                        <div className="flex flex-1 justify-between">
                                            <div>
                                                <p className="font-medium">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Qty: {item.qunatity}
                                                </p>
                                            </div>
                                            <p className="font-semibold">
                                                ${(item.price * item.qunatity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                        <Button
                            fullWidth
                            className="mt-8"
                            onClick={() => router.push('/checkout')}
                        >
                            {paymentMethod === "cod" ? "Place Order" : "Continue to Stripe"}
                        </Button>

                        <Link
                            href={'/shop'}
                            className="mt-5 block text-center text-sm font-medium text-primary hover:underline"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </form>
            </section>
        </FrontendLayout>
    )
}

export default CheckoutPageComponent