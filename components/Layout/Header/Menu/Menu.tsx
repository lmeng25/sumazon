'use client';
import Link from 'next/link';
import useCartService from '@/lib/hooks/useCartStore';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import './Menu.css';

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
        <div className="headerContainer">
            <ul className="headerLinks">
                <li>
                    <Link className="headerLinks" href="/cart">
                        Cart
                        {mounted && items.length > 0 && (
                            <div className="cartCount">
                                {items.reduce((acc, i) => acc + i.quantity, 0)}
                            </div>
                        )}
                    </Link>
                </li>
            </ul>
            <ul className="headerLinks">
                {session && session.user ? (
                    <div className="headerUserActions">
                        <span>Hi, {session.user.name}</span>
                        <Link href="/order-list">My Orders</Link>
                        <Link href="/profile">Profile</Link>
                        {session.user.isAdmin && (
                            <Link href="/admin/products">Admin Menu</Link>
                        )}
                        <button
                            className="signOutButton"
                            onClick={signoutHandler}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <li>
                        <Link className="signinLink" href="/signin">
                            Sign In
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}
