import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-1 min-w-[180px]">
            <div className="text-2xl font-bold text-pink-400">
              <i className="fas fa-capsules"></i>   VeloColla+ 
            </div>
            <p className="text-sm mt-2">
              Multivitamin & Collagen Premium สารสกัดธรรมชาติจากญี่ปุ่น เพื่อผิวสวยจากภายใน
            </p>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">Trust Signals</h3>
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="badge bg-gray-700 text-white border-0">อย. GMP</span>
              <span className="badge bg-gray-700 text-white border-0">HACCP</span>
              <span className="badge bg-gray-700 text-white border-0">ISO 22000</span>
            </div>
            <p className="text-sm mt-3">
              <i className="fas fa-undo-alt mr-1"></i> นโยบายคืนเงินภายใน 7 วัน
            </p>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">ติดตามเรา</h3>
            <div className="flex gap-4 mt-2 text-2xl">
              <a href="#" className="hover:text-pink-400"><i className="fa-brands fa-line"></i></a>
              <a href="#" className="hover:text-pink-400"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="hover:text-pink-400"><i className="fa-brands fa-tiktok"></i></a>
              <a href="#" className="hover:text-pink-400"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          © 2025 CollaPlus Premium. ผลิตภัณฑ์เสริมอาหารไม่ใช่ยามีผลข้างเคียง ควรอ่านฉลากก่อนใช้ ผลการรักษาขึ้นอยู่กับแต่ละบุคคล
        </div>
      </div>
    </footer>
  );
};

export default Footer;