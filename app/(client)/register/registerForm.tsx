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
        <div
            style={{
                maxWidth: '400px',
                margin: '40px auto',
                padding: '20px',
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <h1 style={{ marginBottom: '30px' }}>Register</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <div style={{ marginBottom: '20px' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        {...register('name')}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        {...register('email')}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        {...register('password')}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    Register
                </button>
            </form>
            <div style={{ marginTop: '20px' }}>
                Already have an account?{' '}
                <Link
                    href="/signin"
                    style={{ color: '#007bff', textDecoration: 'none' }}
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
