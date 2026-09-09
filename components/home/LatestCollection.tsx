import { dummyLatestCollections } from "@/dummyData"
import SectionHeader from "../ui/SectionHeader"
import ProductCard from "../products/ProductCard"

const LatestCollection = () => {
    return (
        <section>
            <SectionHeader
                title="Latest Collections"
                subTitle="New Arrivals Added Weekly."
            />

            <div className="my-10">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {
                        dummyLatestCollections.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default LatestCollection