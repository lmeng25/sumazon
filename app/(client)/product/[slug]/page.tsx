import ProductCard from '@/components/Product/ProductCard/ProductCard';
import productFilter from '@/lib/ProductFilter';
import Link from 'next/link';

export default async function ProductDetails(props: any) {
    const slug = props.params.slug;
    const product = await productFilter.getBySlug(slug);
    if (!product) {
        return <h1>Product not found, please try again.</h1>;
    }
    return (
        <>
            <div>
                <Link
                    href="/"
                    style={{
                        padding: '10px 15px',
                        textDecoration: 'none',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                >
                    Back to homepage
                </Link>
            </div>
            <ProductCard product={product} />
        </>
    );
}
