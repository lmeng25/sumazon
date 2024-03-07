'use client';
import { OrderItem } from '@/lib/models/OrderModel';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import toast from 'react-hot-toast';

export default function OrderDetails({ orderId }: { orderId: string }) {
    const { data, error } = useSWR(`/api/orders/${orderId}`);
    if (error) return error.message;
    if (!data) return 'Loading...';

    const handlePayment = () => {
        return fetch(`/api/orders/${orderId}/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(() => {
                toast.success('Successfully paid your order! ');
            });
    };

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: 'auto',
                padding: '20px',
                textAlign: 'center',
            }}
        >
            <h1
                style={{
                    borderBottom: '2px solid #ddd',
                    paddingBottom: '10px',
                }}
            >
                Order Details
            </h1>
            <p style={{ fontSize: '18px', margin: '10px 0' }}>
                Order Total: <strong>${data.totalPrice}</strong>
            </p>
            <p style={{ fontSize: '18px', margin: '10px 0' }}>
                Shipping Address: <strong>{data.shippingAddress}</strong>
            </p>
            <h2
                style={{
                    borderTop: '1px solid #ddd',
                    paddingTop: '10px',
                    marginTop: '20px',
                }}
            >
                Items
            </h2>
            <ul style={{ listStyle: 'none', padding: '0', textAlign: 'left' }}>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                Product
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                Price
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                Quantity
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                Subtotal
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item: OrderItem) => (
                            <tr key={item.slug}>
                                <td
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
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
                                                textAlign: 'center',
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    </Link>
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    ${item.price}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {item.quantity}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    ${item.quantity * item.price}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>

            <button
                onClick={handlePayment}
                disabled={data.isPaid}
                style={{
                    padding: '10px 20px',
                    backgroundColor: data.isPaid ? '#cccccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: data.isPaid ? 'default' : 'pointer',
                    fontSize: '16px',
                    marginTop: '20px',
                }}
            >
                {data.isPaid ? 'Order Paid' : 'Pay Now'}
            </button>
        </div>
    );
}
