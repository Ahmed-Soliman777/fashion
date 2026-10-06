"use client"

import { Category, ProductType, Size } from "@/app/generated/prisma/enums"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FiX } from "react-icons/fi"
import { LuPlus } from "react-icons/lu"

const availableSizes: Size[] = [
    Size.XS,
    Size.S,
    Size.M,
    Size.L,
    Size.XL,
    Size.XXL,
]

const productTypes: ProductType[] = [
    ProductType.HOODIES,
    ProductType.JACKETS,
    ProductType.JEANS,
    ProductType.SHIRTS,
    ProductType.SHOES,
    ProductType.SHORTS,
    ProductType.TROUSERS,
    ProductType.T_SHIRTS,
]

const categories: Category[] = [
    Category.MEN,
    Category.WOMEN,
    Category.CHILDREN,
]

const availableColors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
    { name: "Gray", value: "#6b7280" },
    { name: "Navy", value: "#1e3a8a" },
    { name: "Blue", value: "#2563eb" },
    { name: "Brown", value: "#8b5e3c" },
    { name: "Green", value: "#15803d" },
    { name: "Red", value: "#dc2626" },
]

type ProductFormValues = {
    name: string,
    description: string,
    price: number,
    stock: number,
    category: Category,
    productType: ProductType
}

const page = () => {

    const router = useRouter()

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ProductFormValues>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            category: "MEN",
            productType: "SHIRTS"
        }
    })

    const [images, setImages] = useState<File[]>([])
    const [sizes, setSizes] = useState<string[]>([])
    const [colors, setColors] = useState<string[]>([])
    const [bestSeller, setBestSeller] = useState(false)


    const inputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (!files.length) {
            return
        }
        setImages((prev) => [...prev, ...files].slice(0, 4))

        e.target.value = ""
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    const toggleSize = (size: string) => {
        setSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])
    }

    const toggleColor = (color: string) => {
        setColors((prev) => prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color])
    }

    const handleCreateProduct = async (data: ProductFormValues) => {
        if (images.length == 0) {
            return toast.error("Please upload at least one image.")
        }
        if (sizes.length == 0) {
            return toast.error("Please select at least one size.")
        }
        if (colors.length == 0) {
            return toast.error("Please select at least one color.")
        }

        const selectedColors = availableColors.filter(color => colors.includes(color.name))

        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price.toString())
        formData.append("stock", data.stock.toString())
        formData.append("productType", data.productType)
        formData.append("category", data.category)
        formData.append("bestSeller", String(bestSeller))

        sizes.forEach(size => {
            formData.append('sizes', size)
        })

        selectedColors.forEach(color => {
            formData.append('colors', JSON.stringify(color))
        })

        images.forEach(image => {
            formData.append('images', image)
        })

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                body: formData
            })

            const result = await res.json()

            if (!res.ok) {
                return toast.error(result.message)
            }

            toast.success(result.message)

            reset()

            router.push('/admin/products')
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong.")
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateProduct)} className="mx-auto max-w-5xl space-y-8">
            <div>
                <h2 className="text-3xl font-semibold">Add Product</h2>

                <p className="mt-2 text-muted-foreground">
                    Create a new product for your store.
                </p>
            </div>

            <section className="rounded-2xl border border-border bg-background p-6">
                <h2 className="mb-5 text-lg font-semibold">
                    Product Images
                </h2>

                <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index}>
                                {
                                    images[index] ? (
                                        <div className="relative aspect-square overflow-hidden rounded-xl border-xl border border-border">
                                            <img src={URL.createObjectURL(images[index])} alt="selectedimage" className="w-full h-full object-cover" />

                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow transition hover:bg-destructive hover:text-white">
                                                <FiX />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => inputRef.current?.click()} className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border transition hover:border-primary hover:bg-primary">
                                            <LuPlus className="mt-3 text-sm text-muted-foreground" />

                                            <span className="mt-3 text-sm text-muted-foreground">
                                                Upload Image
                                            </span>
                                        </button>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>

                <input hidden ref={inputRef} multiple type="file" accept="image/*" onChange={handleImageChange} />

                <p className="mt-4 text-sm text-muted-foreground">
                    Upload between 1 and 4 product images.
                </p>
            </section>

            {/* product information */}
            <section className="space-y-5 rounded-2xl border border-border bg-background p-6">
                <h2 className="text-lg font-semibold">
                    Product Information
                </h2>
                <Input
                    {...register('name')}
                    label="Product Name"
                    placeholder="Classic Black Hoodie"
                />
                <Input
                    variant="textarea"
                    {...register('description')}
                    label="Product Description"
                    placeholder="Write a detailed description...."
                />

                <div className="grid gap-5 md:grid-cols-3">
                    <Input
                        {...register('price')}
                        label="Price"
                        placeholder="$79.99"
                    />
                    <Input
                        {...register('stock')}
                        label="Stock Quantity"
                        placeholder="50"
                    />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Category
                        </label>

                        <select
                            {...register("category")}
                            className="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none transition focus:border-primary">
                            {
                                categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Product Type
                        </label>

                        <select
                            {...register('productType')}
                            className="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none transition focus:border-primary">
                            {
                                productTypes.map(productType => (
                                    <option key={productType} value={productType}>{productType}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </section>

            {/* product sizes */}
            <section className="rounded-2xl border border-border bg-background p-6">
                <h2 className="text-lg font-semibold mb-5">
                    Avaliable Sizes
                </h2>

                <div className="flex flex-wrap gap-3">
                    {
                        availableSizes.map(size => {
                            const selected = sizes.includes(size)
                            return (
                                <button
                                    onClick={() => toggleSize(size)}
                                    key={size}
                                    type="button"
                                    className={`h-11 w-16 rounded-lg border font-medium transition ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary hover:bg-primary/5"}`}
                                >
                                    {size}
                                </button>
                            )
                        })
                    }
                </div>
            </section>

            {/* product colors */}
            <section className="rounded-2xl border border-border bg-background p-6">
                <h2 className="text-lg font-semibold mb-5">
                    Avaliable Colors
                </h2>

                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-wrap gap-4">
                        {availableColors.map(color => {
                            const selected = colors.includes(color.name)
                            return (
                                <button
                                    onClick={() => toggleColor(color.name)}
                                    key={color.name}
                                    type="button"
                                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${selected ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                                >
                                    <span className="h-6 w-6 rounded-full border border-border" style={{ backgroundColor: color.value }}></span>

                                    <span className="font-medium">
                                        {color.name}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* product options */}
            <section className="rounded-2xl border border-border bg-background p-6">
                <h2 className="text-lg font-semibold mb-5">
                    Profuct Options
                </h2>

                <div className="space-y-4">
                    <label className="flex cursor-pointer items-center gap-3">
                        <input type="checkbox" checked={bestSeller} className="h-5 w-5 accent-primary" onChange={(e) => setBestSeller(e.target.checked)} />

                        <span>
                            Mark as Best Seller
                        </span>
                    </label>
                </div>
            </section>

            <div className="flex justify-end">
                <Button disabled={isSubmitting}>
                    {isSubmitting ? "Saving Product..." : "Save Product"}
                </Button>
            </div>
        </form>
    )
}

export default page