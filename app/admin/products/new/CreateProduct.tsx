'use client';
import { Product } from '@/lib/models/ProductModel';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CreateProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Product>({
        defaultValues: {
            name: 'Awesome Shirt ' + Math.trunc((Math.random() * 1000) % 1000),
            slug: 'new-product' + Math.trunc((Math.random() * 1000) % 1000),
            image: '/images/shirt1.jpg',
            price: Math.trunc((Math.random() * 100) % 100),
            category: 'shirt',
            brand: 'REI',
            quantity: 20,
            description: 'An awesome shirt for you!',
        },
    });

    const createProduct = async (formData: any) => {
        console.log(formData);
        setIsCreating(true);
        try {
            const res = await fetch(`/api/admin/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            toast.success('Product created successfully');
            router.push('/admin/products');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit(createProduct)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        {...register('name', {
                            required: 'Name is required',
                        })}
                        id="name"
                        type="text"
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="slug">Slug</label>
                    <input
                        {...register('slug', {
                            required: 'Slug is required',
                        })}
                        id="slug"
                        type="text"
                    />
                    {errors.slug && <p>{errors.slug.message}</p>}
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        {...register('price', {
                            required: 'Price is required',
                            valueAsNumber: true,
                        })}
                        id="price"
                        type="number"
                    />
                    {errors.price && <p>{errors.price.message}</p>}
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input
                        {...register('category', {
                            required: 'Category is required',
                        })}
                        id="category"
                        type="text"
                    />
                    {errors.category && <p>{errors.category.message}</p>}
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <input
                        {...register('brand', {
                            required: 'Brand is required',
                        })}
                        id="brand"
                        type="text"
                    />
                    {errors.brand && <p>{errors.brand.message}</p>}
                </div>

                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        {...register('quantity', {
                            required: 'Quantity is required',
                            valueAsNumber: true,
                        })}
                        id="quantity"
                        type="number"
                    />
                    {errors.quantity && <p>{errors.quantity.message}</p>}
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        {...register('description', {
                            required: 'Description is required',
                        })}
                        id="description"
                        type="text"
                    />
                    {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        {...register('image', {
                            required: 'Image is required',
                        })}
                        id="image"
                        type="text"
                    />
                    {errors.image && <p>{errors.image.message}</p>}
                </div>
                <button type="submit" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create'}
                </button>
            </form>
        </div>
    );
}
