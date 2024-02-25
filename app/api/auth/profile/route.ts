import mongodb from '@/lib/mongodb';
import UserModel from '@/lib/models/UserModel';
import bcrypt from 'bcryptjs';
import { auth } from '@/lib/auth';

export const PUT = auth(async (request) => {
    if (!request.auth) {
        return Response.json({ message: 'Not authenticated' }, { status: 401 });
    }
    const { user } = request.auth;
    const { name, email, password } = await request.json();
    await mongodb();
    try {
        const dbUser = await UserModel.findById(user._id);
        if (!dbUser) {
            return Response.json(
                { message: 'User not found' },
                {
                    status: 404,
                }
            );
        }
        dbUser.name = name;
        dbUser.email = email;
        dbUser.password = password
            ? await bcrypt.hash(password, 10)
            : dbUser.password;
        await dbUser.save();
        return Response.json({ message: 'User has been updated' });
    } catch (err: any) {
        return Response.json(
            { message: err.message },
            {
                status: 500,
            }
        );
    }
}) as any;
