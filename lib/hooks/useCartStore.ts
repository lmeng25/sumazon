import { roundToTwo } from '../utils';
import { OrderItem } from '../models/OrderModel';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

type CartStore = {
    items: OrderItem[];
    total: number;
    shippingAddress: string;
};

const initialState: CartStore = {
    items: [],
    total: 0,
    shippingAddress: '',
};

export const useCartStore = create<CartStore>()(
    persist(() => initialState, {
        name: 'cart-storage',
    })
);

export default function useCartService() {
    const { items, total, shippingAddress } = useCartStore();

    return {
        items,
        total: roundToTwo(total),
        initializeCart: () => useCartStore.setState(initialState),
        increaseQuantity: (item: OrderItem) => {
            const existingItem = items.find((i) => i.slug === item.slug);
            if (existingItem) {
                const itemQuantity = existingItem.quantity + 1;
                useCartStore.setState({
                    items: items.map((i) =>
                        i.slug === item.slug
                            ? { ...i, quantity: itemQuantity }
                            : i
                    ),
                });
                const newTotal = items.reduce(
                    (acc, i) => acc + i.price * i.quantity,
                    0
                );
                useCartStore.setState({ total: newTotal });
            } else {
                const updatedItems = [...items, { ...item, quantity: 1 }];
                const newTotal = updatedItems.reduce(
                    (acc, i) => acc + i.price * i.quantity,
                    0
                );
                useCartStore.setState({ items: updatedItems, total: newTotal });
            }
        },
        reduceQuantity: (item: OrderItem) => {
            const existingItem = items.find((i) => i.slug === item.slug);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    useCartStore.setState({
                        items: items.filter((i) => i.slug !== item.slug),
                    });
                } else {
                    const itemQuantity = existingItem.quantity - 1;
                    useCartStore.setState({
                        items: items.map((i) =>
                            i.slug === item.slug
                                ? { ...i, quantity: itemQuantity }
                                : i
                        ),
                    });
                    const newTotal = items.reduce(
                        (acc, i) => acc + i.price * i.quantity,
                        0
                    );
                    useCartStore.setState({ total: newTotal });
                }
            }
        },
        updateShippingAddress: (address: string) => {
            useCartStore.setState({ shippingAddress: address });
        },
        clearCart: () => {
            useCartStore.setState({ items: [] });
        },
    };
}
