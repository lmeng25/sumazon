'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';

type Inputs = {
    email: string;
    password: string;
};

const SigninForm = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    let callbackUrl = searchParams.get('callbackUrl') || '/';
    const { register, handleSubmit } = useForm<Inputs>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        if (session && session.user) {
            router.push(callbackUrl);
        }
    }, [callbackUrl, searchParams, router, session]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await signIn('credentials', {
            email: data.email,
            password: data.password,
        });
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
            <h1 style={{ marginBottom: '30px' }}>Sign In</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
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
                    <label style={{ display: 'block', marginBottom: '8px' }}>
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
                    Sign In
                </button>
            </form>
            <div style={{ marginTop: '20px' }}>
                Need an account?{' '}
                <Link
                    href="/register"
                    style={{ color: '#007bff', textDecoration: 'none' }}
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default SigninForm;
