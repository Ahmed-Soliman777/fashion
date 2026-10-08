import ProductCard from "../products/ProductCard"
import SectionHeader from "../ui/SectionHeader"
import { Suspense } from "react"
import { getBestSellerProducts } from "@/server-actions/product/getBestSellerProducts"
import ProductCardSkeleton from "../loading/skeleton/ProductCardSkeleton"

const BestSellers = () => {
    return (
        <section>
            <SectionHeader
                title="Best Sellers"
                subTitle="Discover our most-loved pieces, carefully selected by thousands of happy customers. Timeless styles designed to elevate your wardrobe."
            />

            <Suspense fallback={<ProductCardSkeleton 
                number={5}
            />}>
                <BestSellersContent />
            </Suspense>

        </section>
    )
}

export default BestSellers

async function BestSellersContent() {
    const products = await getBestSellerProducts()
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