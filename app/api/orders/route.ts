import { auth } from '@/lib/auth';
import mongodb from '@/lib/mongodb';
import OrderModel, { OrderItem } from '@/lib/models/OrderModel';
import ProductModel from '@/lib/models/ProductModel';
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
        await mongodb();
        const dbProductPrices = await ProductModel.find(
            {
                _id: { $in: payload.items.map((x: { _id: string }) => x._id) },
            },
            'price'
        );
        const dbOrderItems = payload.items.map((x: { _id: string }) => ({
            ...x,
            product: x._id,
            price: dbProductPrices.find((x) => x._id === x._id).price,
            _id: undefined,
        }));

        const totalPrice = roundToTwo(
            dbOrderItems.reduce(
                (acc: any, item: any) => acc + item.price * item.quantity,
                0
            )
        );

        const newOrder = new OrderModel({
            items: dbOrderItems,
            totalPrice,
            shippingAddress: payload.shippingAddress,
            paymentMethod: payload.paymentMethod,
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
