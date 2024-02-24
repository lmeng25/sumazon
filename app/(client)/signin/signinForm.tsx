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
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email</label>
                    <input type="email" {...register('email')} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register('password')} />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <div>
                <Link href="/register">Register</Link>
            </div>
        </div>
    );
};

export default SigninForm;
