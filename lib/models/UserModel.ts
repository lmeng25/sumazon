import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, required: true, default: ' ' },
        number: { type: String, required: true, default: ' ' },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

export declare type User = {
    id: string;
    name: string;
    email: string;
    address: string;
    number: string;
    isAdmin: boolean;
};

const UserModel = mongoose.models?.User || mongoose.model('User', userSchema);

export default UserModel;
