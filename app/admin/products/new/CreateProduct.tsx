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
                Create Product
            </h1>
            <form
                onSubmit={handleSubmit(createProduct)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <div>
                    <label
                        htmlFor="name"
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Name
                    </label>
                    <input
                        {...register('name', {
                            required: 'Name is required',
                        })}
                        id="name"
                        type="text"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    {errors.name && (
                        <p style={{ color: 'red' }}>{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="slug"
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Slug
                    </label>
                    <input
                        {...register('slug', {
                            required: 'Slug is required',
                        })}
                        id="slug"
                        type="text"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    {errors.slug && (
                        <p style={{ color: 'red' }}>{errors.slug.message}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="price"
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Price
                    </label>
                    <input
                        {...register('price', {
                            required: 'Price is required',
                            valueAsNumber: true,
                        })}
                        id="price"
                        type="number"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    {errors.price && (
                        <p style={{ color: 'red' }}>{errors.price.message}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="category"
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Category
                    </label>
                    <input
                        {...register('category', {
                            required: 'Category is required',
                        })}
                        id="category"
                        type="text"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    {errors.category && (
                        <p style={{ color: 'red' }}>
                            {errors.category.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="brand"
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Brand
                    </label>
                    <input
                        {...register('brand', {
                            required: 'Brand is required',
                        })}
                        id="brand"
                        type="text"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    {errors.brand && (
                        <p style={{ color: 'red' }}>{errors.brand.message}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="quantity"
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Quantity
                    </label>
                    <input
                        {...register('quantity', {
                            required: 'Quantity is required',
                            valueAsNumber: true,
                        })}
                        id="quantity"
                        type="number"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    {errors.quantity && (
                        <p style={{ color: 'red' }}>
                            {errors.quantity.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="description"
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Description
                    </label>
                    <input
                        {...register('description', {
                            required: 'Description is required',
                        })}
                        id="description"
                        type="text"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    {errors.description && (
                        <p style={{ color: 'red' }}>
                            {errors.description.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="image"
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Image
                    </label>
                    <input
                        {...register('image', {
                            required: 'Image is required',
                        })}
                        id="image"
                        type="text"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    {errors.image && (
                        <p style={{ color: 'red' }}>{errors.image.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isCreating}
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
                    {isCreating ? 'Creating...' : 'Create'}
                </button>
            </form>
        </div>
    );
}
