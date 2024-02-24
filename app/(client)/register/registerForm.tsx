'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    let callbackUrl = searchParams.get('callbackUrl') || '/';
    const { register, handleSubmit } = useForm<Inputs>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    useEffect(() => {
        if (session && session.user) {
            router.push(callbackUrl);
        }
    }, [callbackUrl, searchParams, router, session]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
            }),
        });

        if (response.ok) {
            return router.push(
                `/signin?callbackUrl=${callbackUrl}&success=Account created`
            );
        } else {
            const data = await response.json();
            throw new Error(data.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <input type="text" {...register('name')} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" {...register('email')} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register('password')} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" {...register('confirmPassword')} />
                </div>
                <button type="submit">Register</button>
            </form>
            <div>
                <Link href="/signin">Sign In</Link>
            </div>
        </div>
    );
};

export default RegisterForm;
