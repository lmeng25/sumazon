'use client';
import useCartService from '@/lib/hooks/useCartStore';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShoppingCart() {
    const router = useRouter();
    const { items, increaseQuantity, reduceQuantity } = useCartService();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div
            style={{
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center',
                padding: '20px',
            }}
        >
            <h1 style={{ marginBottom: '30px' }}>Shopping Cart</h1>

            {items.length > 0 ? (
                <div style={{ textAlign: 'left' }}>
                    <table
                        style={{
                            width: '100%',
                            marginBottom: '30px',
                            borderCollapse: 'collapse',
                        }}
                    >
                        <thead>
                            <tr style={{ background: '#f7f7f7' }}>
                                <th
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        textAlign: 'center',
                                    }}
                                >
                                    Product
                                </th>
                                <th
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        textAlign: 'center',
                                    }}
                                >
                                    Quantity
                                </th>
                                <th
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        textAlign: 'center',
                                    }}
                                >
                                    Price
                                </th>
                                <th
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        textAlign: 'center',
                                    }}
                                >
                                    Subtotal
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.slug}>
                                    <td
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        <Link
                                            href={`/product/${item.slug}`}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                            />
                                            <span
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                {item.name}
                                            </span>
                                        </Link>
                                    </td>
                                    <td
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ddd',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <button
                                            onClick={() => reduceQuantity(item)}
                                            style={{
                                                cursor: 'pointer',
                                                margin: '0 10px',
                                            }}
                                        >
                                            -1
                                        </button>
                                        {item.quantity}
                                        <button
                                            onClick={() =>
                                                increaseQuantity(item)
                                            }
                                            style={{
                                                cursor: 'pointer',
                                                margin: '0 10px',
                                            }}
                                        >
                                            +1
                                        </button>
                                    </td>
                                    <td
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ddd',
                                            textAlign: 'center',
                                        }}
                                    >
                                        $ {item.price}
                                    </td>
                                    <td
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ddd',
                                            textAlign: 'center',
                                        }}
                                    >
                                        $ {item.quantity * item.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Total In Cart
                                </td>
                                <td></td>
                                <td></td>
                                <td
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}
                                >
                                    ${' '}
                                    {items.reduce(
                                        (acc, i) => acc + i.price * i.quantity,
                                        0
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <button
                        onClick={() => router.push('/checkout')}
                        style={{ padding: '10px 20px', cursor: 'pointer' }}
                    >
                        Checkout
                    </button>
                </div>
            ) : (
                <div style={{ margin: '30px 0' }}>
                    <h2 style={{ marginBottom: '20px' }}>Your cart is empty</h2>
                    <Link
                        href="/"
                        style={{
                            padding: '10px 15px',
                            textDecoration: 'none',
                            color: '#007bff',
                            fontSize: '18px',
                        }}
                    >
                        Go shopping
                    </Link>
                </div>
            )}
        </div>
    );
}
