import productServices from '@/lib/ProductFilter';
import Image from 'next/image';
import Link from 'next/link';
import './SearchPage.css';

export default async function SearchPage({
    searchParams: { name = '' },
}: {
    searchParams: { name: string };
}) {
    let searchResult = <h1 className="productTitle">No Matching Product</h1>;
    const products = await productServices.getByName(name);
    if (products && products.length > 0) {
        searchResult = (
            <div>
                <h1 className="productTitle">
                    {products.length}{' '}
                    {products.length === 1 ? 'Product' : 'Products'} Found For
                    {' "'}
                    {name}
                    {'" '}
                </h1>
                <div className="productListContainer">
                    {products.map((product) => (
                        <div key={product.slug} className="productItem">
                            <h2>{product.name}</h2>
                            <div>
                                <Link href={`/product/${product.slug}`}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                    />
                                </Link>
                            </div>
                            <div className="productPrice">{`$${product.price}`}</div>{' '}
                            <div
                                className="stockAvailability"
                                style={{
                                    color:
                                        product.quantity === 0
                                            ? 'red'
                                            : 'inherit',
                                }}
                            >
                                {product.quantity === 0
                                    ? 'Out of stock'
                                    : 'In stock'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>{searchResult}</div>
        </div>
    );
}
