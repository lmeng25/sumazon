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
    const { register, handleSubmit, setValue } = useForm<Inputs>();

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
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                maxWidth: '500px',
                margin: 'auto',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h1
                style={{
                    display: 'block',
                    marginBottom: '20px',
                    textAlign: 'center',
                }}
            >
                Your Profile
            </h1>
            <div style={{ marginBottom: '10px' }}>
                <label
                    htmlFor="name"
                    style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: 'bold',
                    }}
                >
                    Name
                </label>
                <input
                    {...register('name')}
                    type="text"
                    id="name"
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label
                    htmlFor="address"
                    style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: 'bold',
                    }}
                >
                    Address
                </label>
                <input
                    {...register('address')}
                    type="text"
                    id="address"
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label
                    htmlFor="number"
                    style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: 'bold',
                    }}
                >
                    Number
                </label>
                <input
                    {...register('number')}
                    type="text"
                    id="number"
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label
                    htmlFor="email"
                    style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: 'bold',
                    }}
                >
                    Email
                </label>
                <input
                    {...register('email')}
                    type="email"
                    id="email"
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label
                    htmlFor="password"
                    style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: 'bold',
                    }}
                >
                    Password
                </label>
                <input
                    {...register('password')}
                    type="password"
                    id="password"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label
                    htmlFor="confirmPassword"
                    style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: 'bold',
                    }}
                >
                    Confirm Password
                </label>
                <input
                    {...register('confirmPassword')}
                    type="password"
                    id="confirmPassword"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                />
            </div>

            <button
                type="submit"
                style={{
                    width: '30%',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
            >
                Update Profile
            </button>
        </form>
    );
};

export default ProfileForm;
