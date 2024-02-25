import OrderDetails from './OrderDetails';

export default function OrderDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    return <OrderDetails orderId={params.id} />;
}
