import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Review } from '../../types/index';

const reviews: Review[] = [
    {
        type: 'beforeafter',
        title: 'Before / After',
        imgBefore: '/images/before1.webp',
        imgAfter: '/images/after1.webp',
        desc: 'ลดริ้วรอยเห็นผลใน 2 อาทิตย์',
    },
    {
        type: 'video',
        title: 'วีดีโอรีวิวสินค้า',
        videoThumb: '/images/ReviewAIGenerate.webm',
        desc: 'ดาว-ภัสสรา รีวิวปังมาก',
    },
    {
        type: 'chat',
        title: 'แชทจากลูกค้า',
        chatImg: '/images/ChatAIGenerate.webp',
        desc: 'ลูกค้าสั่งซื้อรอบที่ 3 ติดใจรสชาติ',
    },
    {
        type: 'buyagain',
        title: 'ลูกค้ากลับมาซื้อซ้ำ',
        chatImg: '/images/ShippingAIGenerate.webp',
        desc: 'พร้อมจัดส่งทุกช่องทาง',
    },
];

const ReviewCard: React.FC<{ review: Review; index: number }> = ({
    review,
    index,
}) => {
    return (
        <motion.div
            layout
            key={index}
            className="shadow-lgg h-full w-80 min-w-[320px] flex-none rounded-xl border border-pink-100 bg-white p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, delay: index * 0.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {review.type === 'beforeafter' &&
                review.imgBefore &&
                review.imgAfter && (
                    <div className="flex justify-center gap-2">
                        <div className="text-center">
                            <p className="mb-1 text-xs text-gray-500">ก่อน</p>
                            <img
                                src={review.imgBefore}
                                className="h-auto w-auto rounded-lg object-cover shadow-md"
                                alt="before"
                            />
                        </div>
                        <div className="text-center">
                            <p className="mb-1 text-xs text-gray-500">หลัง</p>
                            <img
                                src={review.imgAfter}
                                className="h-auto w-auto rounded-lg object-cover shadow-md"
                                alt="after"
                            />
                        </div>
                    </div>
                )}
            {review.type === 'video' && review.videoThumb && (
                <div className="group relative cursor-pointer">
                    <video
                        className="h-auto w-auto rounded-lg shadow-lg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/images/BeforeAfterAIGenerate.webp" // รูปนางแบบที่เราเจนไว้ (โหลดก่อนวิดีโอมา)
                    >
                        <source
                            src={review.videoThumb}
                            type="video/mp4"
                        />
                        เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/20 transition-all group-hover:bg-black/30">
                        <i className="fas fa-play-circle text-5xl text-white drop-shadow-lg transition-transform group-hover:scale-110"></i>
                    </div>
                </div>
            )}
            {review.type === 'chat' && review.chatImg && (
                <div className="relative">
                    <img
                        src={review.chatImg}
                        className="h-auto w-auto rounded-xl object-cover shadow-md"
                        alt="chat screenshot"
                    />
                    <div className="absolute top-2 right-2 rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                        ใหม่
                    </div>
                </div>
            )}
            {review.type === 'buyagain' && review.chatImg && (
                <div className="relative">
                    <img
                        src={review.chatImg}
                        className="h-auto w-auto rounded-xl object-cover shadow-md"
                        alt="chat screenshot"
                    />
                    <div className="absolute top-2 right-2 rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                        ใหม่
                    </div>
                </div>
            )}
            <h4 className="mt-4 text-center text-lg font-bold">
                {review.title}
            </h4>
            <p className="mt-1 text-center text-sm text-gray-500">
                {review.desc}
            </p>
            <div className="mt-3 flex justify-center">
                {[...Array(5)].map((_, i) => (
                    <i
                        key={i}
                        className="fas fa-star text-sm text-yellow-400"
                    ></i>
                ))}
            </div>
        </motion.div>
    );
};

const SocialSlider: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const totalCards = reviews.length + 1; // +1 สำหรับการ์ดพิเศษ
    const cardWidth = 320 + 24; // width (320px) + gap (24px)

    // ฟังก์ชันเลื่อนไปยังการ์ดที่ต้องการ
    const scrollToCard = (index: number) => {
        scrollContainerRef.current?.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth',
        });
    };

    const scrollToNext = () => {
        const nextIndex = (activeIndex + 1) % totalCards;
        scrollToCard(nextIndex);
    };

    const scrollToPrev = () => {
        const prevIndex = activeIndex === 0 ? totalCards - 1 : activeIndex - 1;
        scrollToCard(prevIndex);
    };

    // 3. ฟังก์ชันจัดการเมื่อผู้ใช้มายุ่งกับ Slider (เพิ่มใหม่)
    const handleInteraction = () => {
        setIsPaused(true); // สั่งหยุด Auto-scroll ทันที
        if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

        // หลังจากหยุดยุ่ง 5 วินาที ให้กลับมาเลื่อนต่อเอง
        pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 5000);
    };
    // 2. ระบบ Auto-scroll (Update: ใช้ตัวแปร isPaused ควบคุม)
    useEffect(() => {
        const interval = setInterval(() => {
            // ใช้ Functional Update เพื่อให้ได้ค่า Index ล่าสุดเสมอ
            if (!isPaused) {
                setActiveIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % totalCards;
                    scrollToCard(nextIndex); // สั่งเลื่อนไปหน้าถัดไป
                    return nextIndex;
                });
            }
        }, 3000); // ปรับเป็น 3 วินาทีเพื่อให้เห็นผลเร็วขึ้น

        return () => clearInterval(interval);
    }, [isPaused, totalCards]); // จะเริ่มนับใหม่เมื่อหยุดพักหรือเลื่อนเสร็จ

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollPosition = container.scrollLeft;
            // คำนวณว่าตอนนี้อยู่ที่การ์ดไหน
            const currentIndex = Math.round(scrollPosition / cardWidth);

            if (
                currentIndex !== activeIndex &&
                currentIndex >= 0 &&
                currentIndex < totalCards
            ) {
                setActiveIndex(currentIndex);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [activeIndex, cardWidth, totalCards]);

    return (
        <div id="reviews" className="my-16">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
                💬 รีวิวจากผู้ใช้จริง
            </h2>
            <p className="mb-12 text-center text-gray-500">
                มากกว่า 10,000+ รีวิว พร้อมภาพ Before-After
            </p>

            {/* Auto-scroll Status Indicator */}
            {/* <div className="mb-4 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-xs text-gray-500">
                    <div
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            !isPaused
                                ? 'animate-pulse bg-green-500'
                                : 'bg-yellow-500'
                        }`}
                    ></div>
                    <span>
                        {!isPaused
                            ? '✨ กำลังเลื่อนอัตโนมัติ (เลื่อนไปเรื่อยๆ) ✨'
                            : '⏸️ หยุดชั่วคราว (จะเริ่มเลื่อนอีกครั้งใน 5 วินาที)'}
                    </span>
                </div>
            </div> */}

            {/* Scrollable Container */}
            <div className="relative" onTouchStart={handleInteraction}>
                {/* Gradient indicators */}
                <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-white to-transparent md:block"></div>
                <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 hidden w-12 bg-gradient-to-l from-white to-transparent md:block"></div>

                <div
                    ref={scrollContainerRef}
                    onScroll={handleInteraction}
                    className="flex gap-6 overflow-x-auto scroll-smooth px-4 pb-6"
                    style={{
                        scrollSnapType: 'x mandatory', // เพิ่มเพื่อให้การลากด้วยมือ "ล็อก" เข้าจุดพอดี
                        scrollbarWidth: 'thin',
                        WebkitOverflowScrolling: 'touch',
                        scrollBehavior: 'smooth',
                    }}
                >
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="w-80 flex-none"
                            style={{ scrollSnapAlign: 'start' }}
                        >
                            <ReviewCard review={review} index={idx} />
                        </div>
                    ))}

                    {/* Extra Review Card */}
                    <div
                        className="w-80 flex-none"
                        style={{ scrollSnapAlign: 'start' }}
                    >
                        <motion.div
                            className="h-full rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 p-6 shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="mb-3 flex justify-center">
                                <div className="rounded-full bg-yellow-100 p-3">
                                    <i className="fas fa-quote-right text-2xl text-yellow-600"></i>
                                </div>
                            </div>
                            <p className="text-center text-lg leading-relaxed font-semibold text-gray-800">
                                “ซื้อซ้ำตลอด 3 เดือน ผิวขาวใสขึ้นจริง”
                            </p>
                            <div className="mt-3 flex justify-center">
                                {[...Array(5)].map((_, i) => (
                                    <i
                                        key={i}
                                        className="fas fa-star text-sm text-yellow-400"
                                    ></i>
                                ))}
                            </div>
                            <div className="mt-3 text-center">
                                <p className="font-medium text-pink-600">
                                    - คุณเจน, กรุงเทพ
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    ซื้อซ้ำครั้งที่ 3
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
                <button
                    onClick={() => {
                        scrollToPrev();
                    }}
                    className="btn btn-circle h-10 w-10 border-0 bg-pink-100 text-pink-600 shadow-md transition-all hover:bg-pink-200 hover:shadow-lg"
                >
                    <i className="fas fa-chevron-left"></i>
                </button>

                {/* Dot Indicators */}
                <div className="flex items-center gap-2">
                    {[...Array(totalCards)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                scrollToCard(idx);
                            }}
                            className={`transition-all duration-300 ${
                                activeIndex === idx
                                    ? 'h-2 w-8 rounded-full bg-pink-600'
                                    : 'h-2 w-2 rounded-full bg-pink-300 hover:bg-pink-500'
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => {
                        scrollToNext();
                    }}
                    className="btn btn-circle h-10 w-10 border-0 bg-pink-100 text-pink-600 shadow-md transition-all hover:bg-pink-200 hover:shadow-lg"
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-400">
                <i className="fas fa-arrows-alt-h mr-1"></i>
                ลากเพื่อดูรีวิวเพิ่มเติม
                {/* ลากเพื่อดูรีวิวเพิ่มเติม • จะเลื่อนอัตโนมัติตลอดเวลา */}
            </p>
        </div>
    );
};

export default SocialSlider;
