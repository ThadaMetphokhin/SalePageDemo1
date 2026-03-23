import React from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Feature } from '../../types/index';

const features: Feature[] = [
  { 
    icon: "fas fa-rocket", 
    title: "นวัตกรรม Nano-Absorption", 
    desc: "ดูดซึมไวใน 5 นาที กระตุ้นคอลลาเจนทันที", 
    color: "text-cyan-600" 
  },
  { 
    icon: "fas fa-seedling", 
    title: "สารสกัด Organic 100%", 
    desc: "ปลอดภัย มี อย. รับรองมาตรฐานสากล", 
    color: "text-green-600" 
  },
  { 
    icon: "fas fa-ice-cream", 
    title: "รสชาติอร่อย ทานง่าย", 
    desc: "ไม่คาว ไม่มีน้ำตาล 0% Calorie", 
    color: "text-orange-500" 
  }
];

const HighlightCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 product-card-hover border border-pink-50"
    >
      <div className="card-body items-center text-center">
        <motion.div 
          className={`text-5xl ${feature.color} animate-bounce`}
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <i className={feature.icon}></i>
        </motion.div>
        <h3 className="card-title text-xl mt-2">{feature.title}</h3>
        <p className="text-gray-600">{feature.desc}</p>
      </div>
    </motion.div>
  );
};

const ProductHighlights: React.FC = () => {
  return (
    <div id="highlights" className="my-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">✨ จุดเด่นที่ทำให้แตกต่าง ✨</h2>
      <p className="text-center text-gray-500 mb-12">นวัตกรรมล้ำสมัย ดูดซึมไว ทานง่าย ได้ผลจริง</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <HighlightCard key={idx} feature={feature} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default ProductHighlights;