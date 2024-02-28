'use client';
import { useSearchParams } from 'next/navigation';

export const SearchBox = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || '';
    return (
        <form action="/search" method="GET">
            <div className="join">
                <input
                    placeholder="Search by name"
                    defaultValue={name}
                    name="name"
                />
                <button>Search</button>
            </div>
        </form>
    );
};
