import mongoose from 'mongoose';
import { env } from 'process';

export default async function mongodb() {
    try {
        await mongoose.connect(env.MONGODB_URI!);
    } catch (e) {
        throw new Error('Failed to connect to mongodb');
    }
}
