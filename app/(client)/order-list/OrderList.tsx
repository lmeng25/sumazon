'use client';
import { Order } from '@/lib/models/OrderModel';
import useSWR from 'swr';
import Link from 'next/link';

export default function OrderList() {
    const { data: orders, error } = useSWR(`/api/orders/userOrders`);
    if (error) return 'An error has occurred.';
    if (!orders) return 'Loading...';
    return (
        <div
            style={{
                maxWidth: '800px',
                margin: 'auto',
                textAlign: 'center',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            <h1 style={{ marginBottom: '30px' }}>My Orders</h1>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginBottom: '30px',
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
                            Date
                        </th>
                        <th
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center',
                            }}
                        >
                            Total
                        </th>
                        <th
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center',
                            }}
                        >
                            Status
                        </th>
                        <th
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center',
                            }}
                        >
                            View
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order: Order) => (
                        <tr key={order._id}>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                ${order.totalPrice}
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                {order.isPaid ? 'Paid' : 'Not Paid'}
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                <Link
                                    href={`/order/${order._id}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#007bff',
                                    }}
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
