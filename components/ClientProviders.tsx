'use client';
import toast, { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';

export default function ClientProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SWRConfig
            value={{
                onError: (error) => {
                    toast.error(error.message);
                },
                fetcher: async (resource, init) => {
                    const res = await fetch(resource, init);
                    if (!res.ok) {
                        throw new Error(
                            'An error occurred while fetching the data.'
                        );
                    }
                    return res.json();
                },
            }}
        >
            <div>
                <Toaster toastOptions={{ className: 'toaster-con' }} />
                {children}
            </div>
        </SWRConfig>
    );
}
