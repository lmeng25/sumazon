'use client';
import Link from 'next/link';
import useCartService from '@/lib/hooks/useCartStore';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function Menu() {
    const { items } = useCartService();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const signoutHandler = async () => {
        signOut({ callbackUrl: '/signin' });
    };

    const { data: session } = useSession();

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <ul>
                <Link href="/cart">
                    Cart
                    {mounted && items.length > 0 && (
                        <div>
                            {items.reduce(
                                (acc: any, i: { quantity: any }) =>
                                    acc + i.quantity,
                                0
                            )}{' '}
                        </div>
                    )}
                </Link>
            </ul>
            <ul>
                {session && session.user ? (
                    <div>
                        Hi, {session.user.name}{' '}
                        <Link href="/profile">Profile</Link>
                        <button onClick={signoutHandler}>Sign Out</button>
                    </div>
                ) : (
                    <Link href="/signin">Sign In</Link>
                )}
            </ul>
        </div>
    );
}
