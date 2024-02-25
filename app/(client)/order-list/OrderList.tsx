'use client';
import { Order } from '@/lib/models/OrderModel';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OrderList() {
    const router = useRouter();
    const { data: orders, error } = useSWR(`/api/orders/userOrders`);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <></>;

    if (error) return 'An error has occurred.';
    if (!orders) return 'Loading...';

    return (
        <div>
            <h1>My Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order: Order) => (
                        <tr key={order._id}>
                            <td>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                            <td>
                                <Link href={`/order/${order._id}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
