import Header from '@/Components/Home/Header';
import Hero from '@/Components/Home/Herosection';
import ProductHighlights from '@/Components/Home/ProductHighLight';
import PriceTable from '@/Components/Home/PriceTable';
import SocialSlider from '@/Components/Home/SocialSlider';
import FastCheckout from '@/Components/Home/FastCheckout';
import Footer from '@/Components/Home/Footer';

import HeadComponent from '@/Components/Home/Head';

export default function HomePage() {
    return (
        <>
            <HeadComponent />
            <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50 font-sans">
                <Header />
                <main className="container mx-auto max-w-7xl px-4 py-6 md:py-10">
                    <Hero />
                    <ProductHighlights />
                    <PriceTable />
                    <SocialSlider />
                    <FastCheckout />
                </main>
                <Footer />
            </div>
        </>
    );
}
