'use client';
import { Product } from '@/lib/models/ProductModel';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ProductForm({ productId }: { productId: string }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Product>();

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/products/${productId}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setLoading(false);
            Object.keys(data).forEach((key) => {
                setValue(key as keyof Product, data[key]);
            });
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const updateProduct = async (formData: any) => {
        setIsUpdating(true);
        try {
            const res = await fetch(`/api/admin/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            toast.success('Product updated successfully');
            router.push('/admin/products');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const formSubmit = async (formData: any) => {
        await updateProduct(formData);
    };

    if (loading) return 'Loading...';
    if (error) return error;

    const FormInput = ({
        id,
        name,
        required,
        pattern,
    }: {
        id: keyof Product;
        name: string;
        required?: boolean;
        pattern?: ValidationRule<RegExp>;
    }) => (
        <div>
            <div>
                <label
                    htmlFor={id}
                    style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: 'bold',
                    }}
                >
                    {name}
                </label>
                <div>
                    <input
                        type="text"
                        id={id}
                        {...register(id, {
                            required: required && `${name} is required`,
                            pattern,
                        })}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    {errors[id]?.message && <div>{errors[id]?.message}</div>}
                </div>
            </div>
        </div>
    );

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: '40px auto',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
            }}
        >
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                Edit Product
            </h1>
            <form
                onSubmit={handleSubmit(formSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <FormInput id="name" name="Name" required />
                <FormInput id="slug" name="Slug" required />
                <FormInput id="price" name="Price" required pattern={/^\d+$/} />
                <FormInput id="image" name="Image" />
                <FormInput id="category" name="Category" required />
                <FormInput id="brand" name="Brand" required />
                <FormInput
                    id="quantity"
                    name="Quantity"
                    required
                    pattern={/^\d+$/}
                />
                <FormInput id="description" name="Description" required />
                <button
                    type="submit"
                    disabled={isUpdating}
                    style={{
                        padding: '10px 20px',
                        marginTop: '20px',
                        width: '30%',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    {isUpdating ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
}
