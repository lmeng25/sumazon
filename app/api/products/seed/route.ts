import { NextRequest, NextResponse } from 'next/server';
import mongodb from '@/lib/mongodb';
import UserModel from '@/lib/models/UserModel';
import ProductModel from '@/lib/models/ProductModel';
import data from '@/lib/data';

export const GET = async (req: NextRequest) => {
    const { users, products } = data;
    await mongodb();
    await UserModel.deleteMany();
    await UserModel.insertMany(users);

    await ProductModel.deleteMany();
    await ProductModel.insertMany(products);

    return NextResponse.json({
        message: 'seeded successfully',
        users,
        products,
    });
};
