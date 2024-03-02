import Link from 'next/link';
import Menu from './Menu/Menu';
import { SearchBox } from './Menu/SearchBox';
import Image from 'next/image';
import './Header.css';

export default function Header() {
    return (
        <header>
            <nav>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '50px',
                    }}
                >
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={150}
                            height={100}
                        />
                    </Link>
                    <SearchBox />

                    <Menu />
                </div>
                <div></div>
            </nav>
        </header>
    );
}
