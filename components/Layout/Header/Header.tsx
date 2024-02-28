import Link from 'next/link';
import Menu from './Menu/Menu';
import { SearchBox } from './Menu/SearchBox';

export default function Header() {
    return (
        <header>
            <nav>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="/">SUMAZON</Link>
                    <Menu />
                </div>
                <div>
                    <SearchBox />
                </div>
            </nav>
        </header>
    );
}
