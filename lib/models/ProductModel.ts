import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, unique: true, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        brand: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        quantity: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

export type Product = {
    _id?: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    brand: string;
    description: string;
    category: string;
    quantity: number;
};

const ProductModel =
    mongoose.models.Product || mongoose.model('Product', productSchema);

export default ProductModel;
