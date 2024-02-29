'use client';
import { Product } from '@/lib/models/ProductModel';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ProductForm({ productId }: { productId: string }) {
    const [product, setProduct] = useState(null);
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
            setProduct(data);
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
            <label htmlFor={id}>{name}</label>
            <div>
                <input
                    type="text"
                    id={id}
                    {...register(id, {
                        required: required && `${name} is required`,
                        pattern,
                    })}
                />
                {errors[id]?.message && <div>{errors[id]?.message}</div>}
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
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
            <button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Update'}
            </button>
        </form>
    );
}
