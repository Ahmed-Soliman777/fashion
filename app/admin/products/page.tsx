import DeleteProductButton from "@/components/admin/DeleteProductButton"
import Button from "@/components/ui/Button"
import { getProducts } from "@/server-actions/product/getProduct"
import Image from "next/image"
import Link from "next/link"
import { FaTrashAlt } from "react-icons/fa"
import { FiPlus } from "react-icons/fi"

export const dynamic = "force-dynamic"

const page = async () => {
    const products = await getProducts()
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
                    href={'/admin/add-product'}
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
                                                    src={product.images[0].imageUrl}
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
                                            <DeleteProductButton
                                                productId={product.id}
                                            />
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