import Head from 'next/head';
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
            {/* <Head>
                <title>Sumazon</title>
                <meta name="description" content="Sumazon" />
                <link rel="icon" href="/favicon.ico" />
            </Head> */}
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
