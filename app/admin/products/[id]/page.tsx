import ProductForm from 'app/admin/products/[id]/ProductForm';

export default function ProductEdit({ params }: { params: { id: string } }) {
    return <ProductForm productId={params.id} />;
}
