interface ProductCardSkeletonProps {
    number: number,
    shop?: boolean
}
const ProductCardSkeleton = ({
    number,
    shop
}: ProductCardSkeletonProps) => {
    return (
        <div className={`my-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 ${shop ? "" : "xl:grid-cols-5"}`}>
            {Array.from({ length: number }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse overflow-hidden rounded-2xl border border-border">
                    <div className="aspect-4/5 bg-surface"></div>
                    <div className="space-y-3 p-4">
                        <div className="h-4 w-3/4 rounded bg-surface"></div>
                        <div className="h-5 w-1/3 rounded bg-surface"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductCardSkeleton