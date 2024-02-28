import mongodb from './mongodb';
import ProductModel, { Product } from './models/ProductModel';

const getBySlug = async (slug: string) => {
    await mongodb();
    const product = await ProductModel.findOne({ slug }).lean();
    return product as Product;
};

const getLatestN = async (n: number) => {
    await mongodb();
    const products = await ProductModel.find({})
        .sort({ _id: -1 })
        .limit(n)
        .lean();
    return products as Product[];
};

const getByName = async (name: string) => {
    await mongodb();
    const regex = new RegExp(name, 'i');
    const products = await ProductModel.find({
        name: { $regex: regex },
    }).lean();
    if (products.length === 0) {
        return [];
    }
    return products as Product[];
};

const productFilter = {
    getBySlug,
    getLatestN,
    getByName,
};

export default productFilter;
