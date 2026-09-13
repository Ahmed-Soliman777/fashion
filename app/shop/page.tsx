import FrontendLayout from '@/components/layouts/FrontendLayout'
import ProductCard from '@/components/products/ProductCard'
import FilterOptions from '@/components/shop/FilterOptions'
import { dummyShopProducts } from '@/dummyData'
import React from 'react'

const page = () => {
    return (
        <FrontendLayout>
            <div className="flex flex-col sm:flex-row gap-5 my-10">
                <FilterOptions />
                <div className="flex-1">

                    <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
                        <h2 className="text-primary font-semibold">Shop</h2>
                        <select className="border border-border text-sm p-3">
                            <option value="low-high">
                                Sort By: Low to High
                            </option>
                            <option value="high-low">
                                Sort By: Low to High
                            </option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {
                            dummyShopProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                    </div>

                </div>
            </div>
        </FrontendLayout>
    )
}

export default page