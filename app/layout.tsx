import Footer from '@/components/Layout/Footer/Footer';
import Header from '@/components/Layout/Header/Header';
import Providers from '@/components/Providers';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
