import FrontendLayout from '@/components/layouts/FrontendLayout'
import ProductPageComponent from '@/components/products/ProductPageComponent'

const page = () => {
    return (
        <FrontendLayout>
            <ProductPageComponent />
        </FrontendLayout>
    )
}

export default page