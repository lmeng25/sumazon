import Link from 'next/link';
import Image from 'next/image';
import productFilter from '@/lib/ProductFilter';
import './ProductList.css';

export default async function ProductList() {
    const products = await productFilter.getLatestN(5);

    let productList = <h2>No matching product</h2>;

    if (products?.length) {
        productList = (
            <div className="productListContainer">
                {products.map((product) => (
                    <div key={product.slug} className="productItem">
                        <h2>{product.name}</h2>
                        <div>{product.brand}</div>
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
                        <div>Category: {product.category}</div>
                        <div>{product.description}</div>
                        <div
                            className="stockAvailability"
                            style={{
                                color:
                                    product.quantity === 0 ? 'red' : 'inherit',
                            }}
                        >
                            Available in stock: {product.quantity}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <div>{productList}</div>
        </div>
    );
}
