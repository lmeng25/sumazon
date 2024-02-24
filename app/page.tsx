import React from 'react';
import ProductList from '@/components/Product/ProductList/ProductList';

export const metadata = {
    title: 'Sumazon',
};

export default async function Home() {
    return (
        <div>
            <div>
                <ProductList />
            </div>
        </div>
    );
}
