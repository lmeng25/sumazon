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
    const body = await req.json();
    const { name, slug, image, price, category, brand, quantity, description } =
        body;

    if (
        !name ||
        !slug ||
        !image ||
        !price ||
        !category ||
        !brand ||
        quantity == null ||
        !description
    ) {
        return Response.json(
            { message: 'Missing required fields' },
            {
                status: 400,
            }
        );
    }
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
        name,
        slug,
        image,
        price,
        category,
        brand,
        quantity,
        description,
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
