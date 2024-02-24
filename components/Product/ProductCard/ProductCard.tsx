'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/models/ProductModel';
import AddToCart from '../AddToCart';
import { convertToObj } from '@/lib/utils';
import './ProductCard.css';

export default function ProductCard({ product }: { product: Product }) {
    const { name, slug, image, price, brand, description, category, quantity } =
        product;
    return (
        <div className="productContainer">
            <div className="productImageContainer">
                <Link href={`/product/${product.slug}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                    />
                </Link>
            </div>
            <div className="productDetailsContainer">
                <h2 className="productName">{product.name}</h2>
                <div className="productBrand">Brand: {product.brand}</div>
                <div className="productPrice">Price: ${product.price}</div>
                <div className="productCategory">
                    Category: {product.category}
                </div>
                <div className="productDescription">
                    Description: {product.description}
                </div>
                <div
                    className={`productStock ${
                        product.quantity === 0 ? 'stockZero' : ''
                    }`}
                >
                    Available in stock: {product.quantity}
                </div>
                {product.quantity > 0 && (
                    <div className="addToCartContainer">
                        <AddToCart
                            item={{ ...convertToObj(product), quantity: 0 }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
