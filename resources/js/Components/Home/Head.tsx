import { Head } from "@inertiajs/react";

export default function HeadComponent() {
    return (
        <>
            <Head>
                <title>VeloColla+</title>
                <meta
                    name="description"
                    content="Multivitamin & Collagen Premium ผลิตภัณฑ์เสริมอาหารยอดขายอันดับ 1 สารสกัดพรีเมียมจากญี่ปุ่น เห็นผลใน 14 วัน การันตีด้วยรีวิวกว่า 10,000 ราย"
                />
                <meta
                    name="keywords"
                    content="คอลลาเจน, วิตามินซี, บำรุงผิว, สารสกัดญี่ปุ่น, อาหารเสริมผิวขาว, collagen, vitamin"
                />
                <meta name="author" content="Collagen Premium" />
                <meta
                    property="og:title"
                    content="Multivitamin & Collagen Premium - เห็นผลใน 14 วัน"
                />
                <meta
                    property="og:description"
                    content="ผลิตภัณฑ์เสริมอาหารพรีเมียมจากญี่ปุ่น ดูดซึมไว Nano-Absorption ลดเลือนริ้วรอย ผิวกระจ่างใส"
                />
                <meta
                    property="og:image"
                    content="https://placehold.co/600x400/FFD9E8/9B4D6E?text=Collagen+Premium"
                />
                <meta property="og:type" content="website" />
            </Head>
        </>
    );
}
