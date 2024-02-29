'use client';
import { Product } from '@/lib/models/ProductModel';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toast from 'react-hot-toast';

export default function Products() {
    const { data: products, error } = useSWR(`/api/admin/products`);

    const router = useRouter();

    const { trigger: deleteProduct } = useSWRMutation(
        `/api/admin/products`,
        async (url, { arg }: { arg: { productId: string } }) => {
            const toastId = toast.loading('Deleting product...');
            const res = await fetch(`${url}/${arg.productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            res.ok
                ? toast.success('Product deleted successfully', {
                      id: toastId,
                  })
                : toast.error(data.message, {
                      id: toastId,
                  });
        }
    );

    const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
        `/api/admin/products`,
        async (url) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (!res.ok) return toast.error(data.message);

            toast.success('Product created successfully');
            router.push(`/admin/products/${data.product._id}`);
        }
    );

    if (error) return 'An error has occurred.';
    if (!products) return 'Loading...';

    return (
        <div>
            <h1>Products</h1>
            <Link href="/admin/products/new">Create Product</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Quantity</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: Product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <Link href={`/admin/products/${product._id}`}>
                                    Edit
                                </Link>
                            </td>
                            <td>
                                <button
                                    onClick={() =>
                                        deleteProduct({
                                            productId: product._id!,
                                        })
                                    }
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
