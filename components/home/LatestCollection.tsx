import SectionHeader from "../ui/SectionHeader"
import ProductCard from "../products/ProductCard"
import { Suspense } from "react"
import ProductCardSkeleton from "../loading/skeleton/ProductCardSkeleton"
import { getLatestOfProducts } from "@/server-actions/product/getLatestOfProducts"

export const dynmaic = 'force-dynamic'

const LatestCollection = () => {
    return (
        <section>
            <SectionHeader
                title="Latest Collections"
                subTitle="New Arrivals Added Weekly."
            />


            <Suspense
                fallback={<ProductCardSkeleton
                    number={5}
                />}
            >
                <LatestCollectionsContent />
            </Suspense>
        </section>
    )
}

export default LatestCollection

async function LatestCollectionsContent() {

    const products = await getLatestOfProducts()

    return (
        <div className="my-10">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={{
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.images[0].imageUrl
                            }}
                        />
                    ))
                }
            </div>
        </div>
    )
}

