import { auth } from '@/lib/auth';
import ProductModel from '@/lib/models/ProductModel';
import mongodb from '@/lib/mongodb';

export const GET = auth(async (req: any) => {
    if (!req.auth || !req.auth.user?.isAdmin) {
        return Response.json(
            { message: 'unauthorized' },
            {
                status: 401,
            }
        );
    }
    await mongodb();
    const products = await ProductModel.find();
    return Response.json(products);
}) as any;

export const POST = auth(async (req: any) => {
    if (!req.auth || !req.auth.user?.isAdmin) {
        return Response.json(
            { message: 'unauthorized' },
            {
                status: 401,
            }
        );
    }
    await mongodb();
    const product = new ProductModel({
        name: 'new product',
        slug: 'new-product' + Math.random(),
        image: '/images/shirt1.jpg',
        price: Math.random() * 100,
        category: 'shirt',
        brand: 'new brand',
        countInStock: 20,
        description: 'new product description',
    });
    try {
        await product.save();
        return Response.json(
            { message: 'Successfully created product', product },
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
