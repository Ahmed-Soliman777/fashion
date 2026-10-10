import FrontendLayout from '@/components/layouts/FrontendLayout'
import ProductPageSkeleton from '@/components/loading/skeleton/ProductPageSkeleton'
import ProductPageComponent from '@/components/products/ProductPageComponent'
import getProductById from '@/server-actions/product/getProductById'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface ProductPageProps {
    params: Promise<{
        productId: string
    }>
}


const page = async ({ params }: ProductPageProps) => {

    const { productId } = await params

    return (
        <FrontendLayout>
            <Suspense fallback={<ProductPageSkeleton />}>
                <ProductContent productId={productId} />
            </Suspense>
        </FrontendLayout>
    )
}

export default page

async function ProductContent({ productId }: { productId: string }) {
    const product = await getProductById(productId)
    if (!product) {
        notFound()
    }
    return <ProductPageComponent product={product}/>
}