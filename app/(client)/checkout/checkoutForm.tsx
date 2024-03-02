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
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                maxWidth: '500px',
                margin: 'auto',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div style={{ marginBottom: '10px' }}>
                <h1
                    style={{
                        display: 'block',
                        marginBottom: '5px',
                        textAlign: 'center',
                    }}
                >
                    Shipping Address
                </h1>
                <br />
                <input
                    {...register('address', {
                        required: 'Shipping address is required',
                    })}
                    id="address"
                    type="text"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                />
            </div>
            <br />
            <div
                style={{
                    marginBottom: '20px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                }}
            >
                <strong>Total:</strong> $
                {items.reduce((acc, i) => acc + i.price * i.quantity, 0)}
            </div>
            <button
                style={{
                    width: '30%',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
            >
                Submit Order
            </button>
        </form>
    );
};

export default CheckoutForm;
