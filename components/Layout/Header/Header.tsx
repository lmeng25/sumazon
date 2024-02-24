import Link from 'next/link';
import Menu from './Menu/Menu';

export default function Header() {
    return (
        <header>
            <nav>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="/">SUMAZON</Link>
                    <Menu />
                </div>
            </nav>
        </header>
    );
}
