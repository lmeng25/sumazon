import mongodb from '@/lib/mongodb';
import OrderModel from '@/lib/models/OrderModel';
import { auth } from '@/lib/auth';

export const GET = auth(async (request: any) => {
    if (!request.auth) {
        return Response.json(
            { message: 'unauthorized' },
            {
                status: 401,
            }
        );
    }
    const { user } = request.auth;
    await mongodb();
    const orders = await OrderModel.find({ user: user._id });
    return Response.json(orders);
}) as any;
