import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="hero min-h-[80vh] rounded-3xl bg-gradient-to-r from-rose-100/70 to-pink-100/70 shadow-xl p-4 md:p-8 mb-12">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8 w-full">
        <div className="flex-1 text-center lg:text-right animate-float">
          <img 
            src="/images/ProductAIGenerate.webp" 
            alt="Multivitamin & Collagen Premium ขวดหรูพร้อมผลไม้สด" 
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:mx-0 object-cover"
            loading="eager"
            width="500" 
            height="400"
          />
          <div className="badge badge-secondary mt-3 gap-1">
            <i className="fas fa-check-circle"></i> อย. 10-1-12345-6-0077
          </div>
        </div>
        <div className="flex-1 space-y-5">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            จบทุกปัญหาผิวโทรม <span className="text-pink-600">คืนความกระจ่างใสใน 14 วัน</span> ด้วยสารสกัดพรีเมียมจากญี่ปุ่น
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            ผลิตภัณฑ์เสริมอาหารยอดขายอันดับ 1 ที่ดาราและเซเลบไว้วางใจ การันตีด้วยรีวิวนับหมื่นราย
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#order" className="btn btn-primary bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 text-lg px-8 py-3 h-auto shadow-xl hover:shadow-2xl transition-all">
              สั่งซื้อวันนี้ รับส่วนลด 50% <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <a href="#reviews" className="btn btn-outline btn-pink-600">
              ดูรีวิวจริง
            </a>
          </div>
          <div className="flex-1 text-center lg:text-right animate-floa md:hidden lg:hidden">
          <img 
            src="/images/ProductAIGenerate.webp" 
            alt="Multivitamin & Collagen Premium ขวดหรูพร้อมผลไม้สด" 
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:mx-0 object-cover"
            loading="eager"
            width="500" 
            height="400"
          />
          <div className="badge badge-secondary mt-3 gap-1">
            <i className="fas fa-check-circle"></i> อย. 10-1-12345-6-0077
          </div>
        </div>
          <div className="flex flex-wrap gap-5 pt-3 text-sm text-gray-500">
            <span><i className="fas fa-truck-fast text-pink-500"></i> จัดส่งฟรี</span>
            <span><i className="fas fa-shield-alt text-pink-500"></i> รับประกันคืนเงิน 7 วัน</span>
            <span><i className="fas fa-users text-pink-500"></i> ลูกค้าซื้อซ้ำ 95%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;