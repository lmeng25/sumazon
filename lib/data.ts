import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'admin',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
            address: 'address 1',
            number: '123456789',
        },
        {
            name: 'u1',
            email: 'u1@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
            address: 'address 1',
            number: '123456789',
        },
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpg',
            price: 70,
            brand: 'Nike',
            quantity: 20,
            description: 'A popular shirt',
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            image: '/images/shirt2.jpg',
            price: 20,
            brand: 'Adidas',
            quantity: 20,
            description: 'A popular shirt',
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirts',
            image: '/images/shirt3.jpg',
            price: 90,
            brand: 'Raymond',
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'Golf Pants',
            slug: 'golf-pants',
            category: 'Pants',
            image: '/images/pants1.jpg',
            price: 90,
            brand: 'Oliver',
            quantity: 20,
            description: 'Smart looking pants',
        },
        {
            name: 'Fit Pants',
            slug: 'fit-pants',
            category: 'Pants',
            image: '/images/pants2.jpg',
            price: 95,
            brand: 'Zara',
            quantity: 20,
            description: 'A popular pants',
        },
        {
            name: 'Classic Pants',
            slug: 'classic-pants',
            category: 'Pants',
            image: '/images/pants3.jpg',
            price: 75,
            brand: 'Casely',
            quantity: 20,
            description: 'A popular pants',
        },
    ],
};

export default data;
