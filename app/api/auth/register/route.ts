import bcrypt from 'bcryptjs';
import mongodb from '@/lib/mongodb';
import UserModel from '@/lib/models/UserModel';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    const { name, email, password } = await request.json();
    await mongodb();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        return Response.json(
            { message: 'Successfully created the new user' },
            {
                status: 201,
            }
        );
    } catch (error: any) {
        return Response.json(
            { message: error.message },
            {
                status: 500,
            }
        );
    }
};
