import { auth } from '@/lib/auth';
import OrderModel, { OrderItem } from '@/lib/models/OrderModel';
import { roundToTwo } from '@/lib/utils';

export const POST = auth(async (request: any) => {
    if (!request.auth) {
        return Response.json(
            { message: 'unauthorized' },
            {
                status: 401,
            }
        );
    }
    const { user } = request.auth;
    try {
        const payload = await request.json();
        const orderItems = payload.items.map((x: any) => {
            return {
                ...x,
                product: x._id,
                price: x.price,
                _id: undefined,
            };
        });
        const totalPrice = roundToTwo(
            orderItems.reduce(
                (acc: any, item: any) => acc + item.price * item.quantity,
                0
            )
        );

        const newOrder = new OrderModel({
            items: orderItems,
            totalPrice,
            shippingAddress: payload.shippingAddress,
            user: user._id,
        });

        const createdOrder = await newOrder.save();
        return Response.json(
            {
                message: 'Successfully created a new order',
                order: createdOrder,
            },
            {
                status: 201,
            }
        );
    } catch (err: any) {
        return Response.json(
            { message: err.message },
            {
                status: 500,
            }
        );
    }
}) as any;
