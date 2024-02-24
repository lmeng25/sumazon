import ProductCard from '@/components/Product/ProductCard/ProductCard';
import productFilter from '@/lib/ProductFilter';
import ProductModel from '@/lib/models/ProductModel';
import Link from 'next/link';

export async function Metadata(props: any) {
    const slug = props.params.slug;
    const product = await productFilter.getBySlug(slug);
    if (!product) {
        return { title: 'Oops, product not found' };
    }
    return {
        title: product.name,
        description: product.description,
    };
}

export default async function ProductDetails(props: any) {
    const slug = props.params.slug;
    const product = await productFilter.getBySlug(slug);
    if (!product) {
        return <h1>Product not found, please try again.</h1>;
    }
    return (
        <>
            <div>
                <Link href="/">Back to homepage</Link>
            </div>
            <ProductCard product={product} />
        </>
    );
}
