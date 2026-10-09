import FrontendLayout from '@/components/layouts/FrontendLayout'
import FilterOptions from '@/components/shop/FilterOptions'
import { Category, ProductType } from '../generated/prisma/enums'
import { Suspense } from 'react'
import ShopProducts from '@/components/shop/ShopProducts'
import SortOptions from '@/components/shop/SortOptions'

interface ShopPageProps {
    searchParams: Promise<{
        category?: Category
        productType?: ProductType
        sort?: "high-low" | "low-high" | "newest" | "oldest"
    }>
}

const page = async ({
    searchParams
}: ShopPageProps) => {
    const params = await searchParams
    return (
        <FrontendLayout>
            <div className="flex flex-col sm:flex-row gap-5 my-10">
                <FilterOptions />
                <div className="flex-1">

                    <SortOptions />

                    <Suspense>
                        <ShopProducts
                            searchParams={params}
                        />
                    </Suspense>

                </div>
            </div>
        </FrontendLayout>
    )
}

export default page