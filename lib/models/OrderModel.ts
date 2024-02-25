import mongoose from 'mongoose';
import { Product } from './ProductModel';
import { User } from './UserModel';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: { type: String, required: true },
                slug: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
            },
        ],
        shippingAddress: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, required: true, default: false },
        paidAt: { type: Date },
    },
    { timestamps: true }
);

export type Order = {
    _id?: string;
    user?: User;
    orderItems: [OrderItem];
    shippingAddress: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    createdAt: string;
};

export type OrderItem = {
    name: string;
    slug: string;
    quantity: number;
    product: Product;
    price: number;
    image: string;
};

const OrderModel =
    mongoose.models.Orders || mongoose.model('Orders', orderSchema);

export default OrderModel;
