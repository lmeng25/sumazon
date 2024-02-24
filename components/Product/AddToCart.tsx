'use client';

import useCartService from '@/lib/hooks/useCartStore';
import { OrderItem } from '@/lib/models/OrderModel';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddToCart({ item }: { item: OrderItem }) {
    const router = useRouter();
    const { items, increaseQuantity, reduceQuantity } = useCartService();
    const [inCartItem, setInCartItem] = useState<OrderItem | undefined>();

    useEffect(() => {
        const existingItem = items.find((i) => i.slug === item.slug);
        setInCartItem(existingItem);
    }, [item, items]);

    const handleAddToCart = () => {
        increaseQuantity(item);
    };

    return inCartItem ? (
        <div>
            <button onClick={() => reduceQuantity(inCartItem)}>-1</button>
            {inCartItem.quantity}
            <button onClick={() => increaseQuantity(inCartItem)}>+1</button>
        </div>
    ) : (
        <button onClick={handleAddToCart}>Add to Cart</button>
    );
}
