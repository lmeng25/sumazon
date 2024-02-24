'use client';

import useCartService from '@/lib/hooks/useCartStore';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShoppingCart() {
    const router = useRouter();
    const { items, total, increaseQuantity, reduceQuantity } = useCartService();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <h1>Shopping Cart</h1>

            {items.length > 0 ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.slug}>
                                    <td>
                                        <Link href={`/product/${item.slug}`}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                            ></Image>
                                        </Link>
                                        <Link href={`/product/${item.slug}`}>
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => reduceQuantity(item)}
                                        >
                                            -1
                                        </button>
                                        {item.quantity}
                                        <button
                                            onClick={() =>
                                                increaseQuantity(item)
                                            }
                                        >
                                            +1
                                        </button>
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity * item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total In Cart</td>
                                <td></td>
                                <td></td>
                                <td>
                                    {items.reduce(
                                        (acc, i) => acc + i.price * i.quantity,
                                        0
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <button onClick={() => router.push('/checkout')}>
                        Checkout
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Your cart is empty</h2>
                    <Link href="/"> Go shopping</Link>
                </div>
            )}
        </div>
    );
}
