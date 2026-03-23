import React from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Bundle } from '../../types/index';

const bundles: Bundle[] = [
  { name: "ชุดทดลอง", qty: 1, normalPrice: 1290, specialPrice: 690, tag: "ประหยัด 600.-", highlight: false },
  { name: "ชุดขายดี (แนะนำ)", qty: 3, normalPrice: 3870, specialPrice: 1290, tag: "เฉลี่ยกล่องละ 430.-", highlight: true },
  { name: "ชุดสุดคุ้ม", qty: 6, normalPrice: 7740, specialPrice: 2400, tag: "ตกกล่องละ 400.- เท่านั้น!", highlight: false }
];

const PriceCard: React.FC<{ bundle: Bundle; index: number }> = ({ bundle, index }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.1 } }
      }}
      whileHover={{ y: -8 }}
      className={`card relative ${bundle.highlight ? 'border-2 border-pink-500 shadow-2xl bg-pink-50' : 'border border-gray-200'} rounded-2xl transition-all`}
    >
      {bundle.highlight && (
        <div className="badge badge-secondary absolute -top-3 left-6 z-10 bg-gradient-to-r from-pink-500 to-amber-400 text-white border-0">
          🔥 แนะนำ 🔥
        </div>
      )}
      <div className="card-body text-center">
        <h3 className="card-title justify-center text-2xl">{bundle.name}</h3>
        <div className="text-lg text-gray-500">จำนวน {bundle.qty} กล่อง</div>
        <div className="line-through text-gray-400">฿{bundle.normalPrice.toLocaleString()}</div>
        <div className="text-4xl font-extrabold text-pink-700">
          ฿{bundle.specialPrice.toLocaleString()}<span className="text-sm">.-</span>
        </div>
        <div className="badge badge-outline badge-success p-3 bg-green-50">{bundle.tag}</div>
        <motion.button 
          whileTap={{ scale: 0.96 }}
          className="btn bg-pink-600 text-white hover:bg-pink-700 mt-3 w-full"
          onClick={scrollToOrder}
        >
          เลือกแพ็กเกจนี้
        </motion.button>
      </div>
    </motion.div>
  );
};

const PriceTable: React.FC = () => {
  return (
    <div id="pricing" className="my-20 bg-white/60 rounded-3xl p-6 md:p-8 shadow-lg">
      <div className="text-center mb-10">
        <span className="badge badge-lg bg-pink-100 text-pink-700 border-0 px-4 py-3">
          🔥 โปรโมชั่นจำกัดจำนวน 🔥
        </span>
        <h2 className="text-3xl font-bold mt-4">เลือกแพ็กเกจคุ้มค่าที่สุด</h2>
        <p className="text-gray-500">ราคาพิเศษเฉพาะออนไลน์ คำนวณแบบเรียลไทม์</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bundles.map((bundle, idx) => (
          <PriceCard key={idx} bundle={bundle} index={idx} />
        ))}
      </div>
      <div className="text-center text-xs text-gray-400 mt-6 border-t pt-4">
        * ระบบคำนวณราคาพิเศษอัตโนมัติ ลดสูงสุดถึง 68%
      </div>
    </div>
  );
};

export default PriceTable;