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
            .then((orderData) => {
                toast.success('Successfully paid your order! ');
            });
    };

    return (
        <div>
            <h1>Order Details</h1>
            <p>Order Total: ${data.totalPrice}</p>
            <p>Shipping Address: {data.shippingAddress}</p>
            <h2>Items</h2>
            <ul>
                {data.items.map((item: OrderItem) => (
                    <li key={item.slug}>
                        <Link href={`/product/${item.slug}`}>
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                            />
                            {item.name}
                            {item.price}
                            {item.quantity}
                        </Link>
                    </li>
                ))}
            </ul>

            <button onClick={handlePayment} disabled={data.isPaid}>
                {data.isPaid ? 'Order Paid' : 'Pay Now'}
            </button>
        </div>
    );
}
