'use client';
import { Product } from '@/lib/models/ProductModel';
import Link from 'next/link';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export default function Products() {
    const { data: products, error } = useSWR(`/api/admin/products`);

    const { trigger: deleteProduct } = useSWRMutation(
        `/api/admin/products`,
        async (url, { arg }: { arg: { productId: string } }) => {
            const res = await fetch(`${url}/${arg.productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    );

    if (error) return 'An error has occurred.';
    if (!products) return 'Loading...';

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Products
            </h1>
            <Link
                href="/admin/products/new"
                style={{
                    display: 'inline-block',
                    marginBottom: '20px',
                    backgroundColor: '#007bff',
                    color: '#ffffff',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                }}
            >
                Create Product
            </Link>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px',
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'left',
                            }}
                        >
                            Name
                        </th>
                        <th
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'left',
                            }}
                        >
                            Price
                        </th>
                        <th
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'left',
                            }}
                        >
                            Category
                        </th>
                        <th
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'left',
                            }}
                        >
                            Brand
                        </th>
                        <th
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'left',
                            }}
                        >
                            Quantity
                        </th>
                        <th
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'left',
                            }}
                        >
                            Edit
                        </th>
                        <th
                            style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'left',
                            }}
                        >
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: Product) => (
                        <tr key={product._id}>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                {product.name}
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                ${product.price}
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                {product.category}
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                {product.brand}
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                {product.quantity}
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                <Link
                                    href={`/admin/products/${product._id}`}
                                    style={{ color: '#007bff' }}
                                >
                                    Edit
                                </Link>
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                }}
                            >
                                <button
                                    onClick={() =>
                                        deleteProduct({
                                            productId: product._id!,
                                        })
                                    }
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#dc3545',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
