"use client"

import { useState } from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'
import { Category, ProductType } from '@/app/generated/prisma/enums'
import { useRouter, useSearchParams } from 'next/navigation'

interface ProductTypeFilterComponent {
    label: string
    value: ProductType
}

interface CategoryTypeFilterComponent {
    label: string
    value: Category
}

const productTypes: ProductTypeFilterComponent[] = [
    { label: "T-Shirts", value: ProductType.T_SHIRTS },
    { label: "Shirts", value: ProductType.SHIRTS },
    { label: "Hoodies", value: ProductType.HOODIES },
    { label: "Jackets", value: ProductType.JACKETS },
    { label: "Trousers", value: ProductType.TROUSERS },
    { label: "Jeans", value: ProductType.JEANS },
    { label: "Shorts", value: ProductType.SHORTS },
    { label: "Shoes", value: ProductType.SHOES },
]

const categories: CategoryTypeFilterComponent[] = [
    { label: "Men", value: Category.MEN },
    { label: "Women", value: Category.WOMEN },
    { label: "Children", value: Category.CHILDREN },
]

const FilterOptions = () => {

    const [showFilter, setShowFilter] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    const selectedCategories = searchParams.get("category")?.split(",").filter(Boolean) ?? []
    const selectedTypes = searchParams.get("productType")?.split(",").filter(Boolean) ?? []

    function toggleFilter(key: "category" | "productType", value: string) {
        const params = new URLSearchParams(searchParams.toString())
        const values = params.get(key)?.split(',').filter(Boolean) ?? []
        const updatedValues = values.includes(value) ? values.filter(v => v !== value) : [...values, value]

        if (updatedValues.length === 0) {
            params.delete(key)
        } else {
            params.set(key, updatedValues.join(","))
        }

        const query = params.toString()
        router.replace(query ? `/shop?${query}` : '/shop')
    }

    return (
        <aside className="w-full sm:min-w-60 sm:max-w-60">

            <button
                onClick={() => setShowFilter(prev => !prev)}
                className="mb-4 flex items-center gap-2 text-xl font-semibold sm:cursor-default">
                FILTERS
                <RiArrowRightDoubleFill
                    className={`transition-transform duration-300 sm:hidden ${showFilter ? "rotate-90" : ""}`}
                />
            </button>

            <div className={`space-y-6 sm:block ${showFilter ? "block" : "hidden"}`}>
                <div className="rounded-xl border border-border p-5">

                    <h3 className="mb-4 text-sm font-semibold tracking-wide">
                        CATEGORIES
                    </h3>

                    <div className="space-y-3 text-sm text-muted-foreground">
                        {categories.map((category) => (
                            <label
                                key={category.value}
                                className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.value)}
                                    onChange={() => toggleFilter("category", category.value)}
                                />
                                <span>{category.label}</span>
                            </label>
                        ))}
                    </div>

                </div>

                <div className="rounded-xl border border-border p-5">
                    <h3 className="mb-4 text-sm font-semibold tracking-wide">
                        TYPE
                    </h3>

                    <div className="space-y-3 text-sm text-muted-foreground">
                        {productTypes.map((productType) => (
                            <label
                                key={productType.value}
                                className="flex items-center gap-3">
                                <input
                                    checked={selectedTypes.includes(productType.value)}
                                    onChange={() => toggleFilter("productType", productType.value)}
                                    type="checkbox"
                                />
                                <span>{productType.label}</span>
                            </label>
                        ))}
                    </div>

                </div>
            </div>

        </aside>
    )
}

export default FilterOptions