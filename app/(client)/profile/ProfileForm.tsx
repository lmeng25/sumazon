'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    number: string;
};

const ProfileForm = () => {
    const router = useRouter();
    const { data: session, update } = useSession();
    const { register, handleSubmit, getValues, setValue } = useForm<Inputs>();

    useEffect(() => {
        if (session && session.user) {
            setValue('name', session.user.name!);
            setValue('email', session.user.email!);
            setValue('address', session.user.address!);
            setValue('number', session.user.number!);
        }
    }, [router, session, setValue]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { name, email, password, address, number } = data;
        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    address,
                    number,
                }),
            });
            if (res.status === 200) {
                toast.success('Successfully updated your profile');
                const newSession = {
                    ...session,
                    user: {
                        ...session?.user,
                        name,
                        email,
                        address,
                        number,
                    },
                };
                await update(newSession);
            } else {
                toast.error(
                    'An error occurred while updating your profile, please try again later.'
                );
            }
        } catch (err: any) {
            toast.error(err);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name</label>
                <input {...register('name')} type="text" id="name" required />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input
                    {...register('address')}
                    type="text"
                    id="address"
                    required
                />
            </div>
            <div>
                <label htmlFor="number">Number</label>
                <input
                    {...register('number')}
                    type="text"
                    id="number"
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    {...register('email')}
                    type="email"
                    id="email"
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    {...register('password')}
                    type="password"
                    id="password"
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    {...register('confirmPassword')}
                    type="password"
                    id="confirmPassword"
                />
            </div>

            <button type="submit">Update Profile</button>
        </form>
    );
};

export default ProfileForm;
