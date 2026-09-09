import Image from "next/image";
import Link from "next/link";

interface DummyProduct {
    id: number;
    name: string;
    image: string;
    price: number;
}
interface ProductCardProps {
    product: DummyProduct
}
const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div
            className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
            <Link
                href={`/products/${product.id}`}
            >
                <div className="relative aspect-4/5 overflow-hidden bg-surface">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                </div>
            </Link>

            <div className="p-4">
                <Link
                    href={`/products/${product.id}`}
                >
                    <h3 className="line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                        {product.name}
                    </h3>

                </Link>
                <p className="mt-4 text-lg font-bold text-foreground">
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </div>
    )
}

export default ProductCard