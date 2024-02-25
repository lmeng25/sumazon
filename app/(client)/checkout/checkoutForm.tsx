'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useCartService from '@/lib/hooks/useCartStore';
import useSWRMutation from 'swr/mutation';
import toast from 'react-hot-toast';

const CheckoutForm = () => {
    const router = useRouter();
    const { items, total, shippingAddress, updateShippingAddress, clearCart } =
        useCartService();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            address: shippingAddress,
        },
    });

    useEffect(() => {
        setValue('address', shippingAddress);
    }, [shippingAddress, setValue]);

    const onSubmit = (data: any) => {
        updateShippingAddress(data.address);
        clearCart();
        router.push('/');
    };

    const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
        `/api/orders/mine`,
        async (url) => {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    total,
                    shippingAddress,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                clearCart();
                toast.success('Order placed successfully');
                return router.push(`/order/${data.order._id}`);
            } else {
                toast.error(data.message);
            }
        }
    );

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <></>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="address">Shipping Address</label>
                <input
                    {...register('address', {
                        required: 'Shipping address is required',
                    })}
                    id="address"
                    type="text"
                />
                {errors.address && <p>{errors.address.message}</p>}
            </div>
            <div>
                <strong>Total:</strong> ${total}
            </div>
            <button onClick={() => placeOrder()} disabled={isPlacing}>
                Submit Order
            </button>
        </form>
    );
};

export default CheckoutForm;
