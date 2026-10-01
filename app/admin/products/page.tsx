import Button from "@/components/ui/Button"
import Image from "next/image"
import Link from "next/link"
import { FaTrashAlt } from "react-icons/fa"
import { FiPlus } from "react-icons/fi"

const products = [
    {
        id: 1,
        name: "Classic Denim Jacket",
        category: "Jacket",
        price: 79.99,
        stock: 18,
        status: "Active",
        image: "/product1.png"
    },
    {
        id: 2,
        name: "Premium Hoodie",
        category: "Hoodies",
        price: 59.99,
        stock: 8,
        status: "Active",
        image: "/product2.png"
    },
    {
        id: 3,
        name: "Oversized T-Shirt",
        category: "T-Shirts",
        price: 34.99,
        stock: 0,
        status: "Out of Stock",
        image: "/product3.png"
    },
    {
        id: 4,
        name: "Leather Sneakers",
        category: "Shoes",
        price: 99.99,
        stock: 25,
        status: "Active",
        image: "/product4.png"
    },
]
const page = () => {
    return (
        <section>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h2 className="text-3xl font-semibold">Products</h2>

                    <p className="mt-2 text-muted-foreground">
                        View products on your store.
                    </p>
                </div>
                <Link
                    href={'/add-product'}
                >
                    <Button leftIcon={<FiPlus />}>
                        Add Product
                    </Button>
                </Link>
            </div>

            {/* table */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="border-b border-border bg-surface">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Product
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Price
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Stock
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map(product => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-border last:border-0 hover:bg-surface/50">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={60}
                                                    height={70}
                                                    className="rounded-lg object-cover"
                                                />

                                                <p className="font-medium">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-5 font-medium">
                                            {product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-5">
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${product.stock > 0 ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"}`}
                                            >
                                                {product.stock > 0 ? "Active" : "Out of Stock"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <FaTrashAlt className="text-destructive"/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default page