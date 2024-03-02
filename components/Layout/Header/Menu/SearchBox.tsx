'use client';
import { useSearchParams } from 'next/navigation';

export const SearchBox = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || '';
    return (
        <form action="/search" method="GET">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    placeholder="Search by name"
                    defaultValue={name}
                    name="name"
                    style={{ padding: '5px' }}
                />
                <button style={{ padding: '5px 10px', cursor: 'pointer' }}>
                    Search
                </button>
            </div>
        </form>
    );
};
