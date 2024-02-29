'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useCartService from '@/lib/hooks/useCartStore';
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

    const onSubmit = async (data: any) => {
        updateShippingAddress(data.address);
        const orderResponse = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items,
                total,
                shippingAddress: data.address,
            }),
        });
        const orderData = await orderResponse.json();
        if (orderResponse.ok) {
            clearCart();
            toast.success('Order placed successfully');
            router.push(`/order/${orderData.order._id}`);
        } else {
            toast.error(orderData.message);
        }
    };
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
            </div>
            <div>
                <strong>Total:</strong> $
                {items.reduce((acc, i) => acc + i.price * i.quantity, 0)}
            </div>
            <button>Submit Order</button>
        </form>
    );
};

export default CheckoutForm;
