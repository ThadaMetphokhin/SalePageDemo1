import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckoutFormData } from '../../types/index';

const FastCheckout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    address: "",
    zipcode: "",
    package: "ชุดขายดี",
    payment: "cod"
  });
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [zipValid, setZipValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec: number): string => {
    const mins = Math.floor(sec / 60);
    const remainSec = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainSec.toString().padStart(2, '0')}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "zipcode") {
      const isValid = /^[0-9]{5}$/.test(value);
      setZipValid(isValid || value === "");
    }
    if (name === "phone") {
      const isValid = /^[0-9]{9,10}$/.test(value);
      setPhoneValid(isValid || value === "");
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.address || !zipValid || !phoneValid) {
        alert("กรุณากรอกข้อมูลให้ครบและถูกต้อง (เบอร์โทร 9-10 หลัก, รหัสไปรษณีย์ 5 หลัก)");
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const submitOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`✅ สั่งซื้อสำเร็จ! ทางร้านจะติดต่อกลับทาง ${formData.phone} ภายใน 1 ชม. ขอบคุณที่ไว้วางใจ CollaPlus`);
      setIsSubmitting(false);
    }, 1000);
  };

  const stepTitles = ["ข้อมูลจัดส่ง", "เลือกโปรโมชั่น", "ชำระเงิน"];

  return (
    <div id="order" className="my-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 hover:shadow-3xl transition-shadow duration-300"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-700 to-rose-600 text-white px-8 py-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <i className="fas fa-bolt text-yellow-300"></i>
              Fast Checkout
            </h2>
            <p className="text-pink-100 mt-2 flex items-center gap-2">
              <i className="fas fa-truck-fast"></i>
              กรอกข้อมูลรับส่วนลดทันที • ชำระเงินปลายทางได้ สะดวก ปลอดภัย
            </p>
          </motion.div>
        </div>

        <div className="p-8 md:p-10">
          {/* Step Indicators */}
          <div className="mb-10">
            <div className="flex justify-between items-center relative">
              {/* Background Line */}
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
              
              {/* Steps */}
              {stepTitles.map((title, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: step >= idx + 1 ? 1 : 0.9,
                      backgroundColor: step >= idx + 1 ? '#ec489a' : '#e5e7eb'
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                      step >= idx + 1 
                        ? 'bg-pink-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > idx + 1 ? (
                      <i className="fas fa-check text-xl"></i>
                    ) : (
                      <span className="text-xl font-bold">{idx + 1}</span>
                    )}
                  </motion.div>
                  <span className={`text-sm mt-3 font-medium ${step >= idx + 1 ? 'text-pink-600' : 'text-gray-400'}`}>
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="min-h-[450px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ชื่อ-นามสกุล <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input 
                          type="text" 
                          name="name" 
                          placeholder="เช่น สมชาย ใจดี" 
                          className="input input-bordered w-full pl-10 focus:border-pink-500 focus:ring-pink-500" 
                          value={formData.name} 
                          onChange={handleChange} 
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <i className="fas fa-phone-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input 
                          type="tel" 
                          name="phone" 
                          placeholder="0999999999" 
                          className={`input input-bordered w-full pl-10 ${!phoneValid && formData.phone ? 'border-red-500 focus:border-red-500' : 'focus:border-pink-500'}`} 
                          value={formData.phone} 
                          onChange={handleChange} 
                        />
                      </div>
                      {!phoneValid && formData.phone && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1 flex items-center gap-1"
                        >
                          <i className="fas fa-exclamation-circle"></i>
                          รูปแบบเบอร์ไม่ถูกต้อง (9-10 หลัก)
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ที่อยู่จัดส่ง <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-map-marker-alt absolute left-3 top-3 text-gray-400"></i>
                      <textarea 
                        name="address" 
                        placeholder="บ้านเลขที่, ถนน, ตำบล, อำเภอ, จังหวัด" 
                        className="textarea textarea-bordered w-full pl-10 min-h-[100px] focus:border-pink-500 focus:ring-pink-500" 
                        value={formData.address} 
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      รหัสไปรษณีย์ <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-mail-bulk absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="text" 
                        name="zipcode" 
                        placeholder="เช่น 10110" 
                        className={`input input-bordered w-full pl-10 ${!zipValid && formData.zipcode ? 'border-red-500' : 'focus:border-pink-500'}`} 
                        value={formData.zipcode} 
                        onChange={handleChange} 
                      />
                    </div>
                    {!zipValid && formData.zipcode && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      >
                        <i className="fas fa-exclamation-circle"></i>
                        รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก
                      </motion.p>
                    )}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep} 
                    className="btn bg-gradient-to-r from-pink-600 to-rose-500 text-white w-full mt-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    ดำเนินการต่อ
                    <i className="fas fa-arrow-right ml-2"></i>
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <i className="fas fa-gift text-pink-600"></i>
                      เลือกแพ็กเกจโปรโมชั่น
                    </h3>
                    <select 
                      name="package" 
                      className="select select-bordered w-full bg-white focus:border-pink-500 focus:ring-pink-500" 
                      value={formData.package} 
                      onChange={handleChange}
                    >
                      <option>ชุดทดลอง (1 กล่อง 690.-) ประหยัด 600.-</option>
                      <option>ชุดขายดี (2แถม1 1,290.-) เฉลี่ยกล่องละ 430.-</option>
                      <option>ชุดสุดคุ้ม (4แถม2 2,400.-) ตกกล่องละ 400.-</option>
                    </select>
                    
                    <div className="mt-6 p-4 bg-white rounded-xl border border-pink-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">ราคารวม</span>
                        <span className="text-2xl font-bold text-pink-600">
                          {formData.package.includes("690") && "690"}
                          {formData.package.includes("1,290") && "1,290"}
                          {formData.package.includes("2,400") && "2,400"}
                          .-
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-gray-500">ส่วนลดพิเศษ</span>
                        <span className="text-green-600 font-medium">
                          {formData.package.includes("690") && "ประหยัด 600.-"}
                          {formData.package.includes("1,290") && "ประหยัด 2,580.-"}
                          {formData.package.includes("2,400") && "ประหยัด 5,340.-"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={prevStep} 
                      className="btn btn-outline w-1/2 border-pink-300 text-pink-600 hover:bg-pink-50"
                    >
                      <i className="fas fa-chevron-left mr-2"></i>
                      ย้อนกลับ
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep} 
                      className="btn bg-gradient-to-r from-pink-600 to-rose-500 text-white w-1/2 shadow-md"
                    >
                      เลือกชำระเงิน
                      <i className="fas fa-credit-card ml-2"></i>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Countdown Timer */}
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-5 border border-red-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-hourglass-half text-red-600 text-xl"></i>
                        </div>
                        <div>
                          <p className="text-sm text-red-600 font-medium">เหลือเวลาส่วนลด</p>
                          <p className="text-xs text-gray-500">รีบสั่งซื้อก่อนหมดเวลา!</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="font-mono text-3xl font-bold text-red-600 countdown-number">
                          {formatTime(timeLeft)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <i className="fas fa-wallet text-pink-600"></i>
                      เลือกวิธีชำระเงิน
                    </h3>
                    
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all hover:border-pink-300">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="cod" 
                          checked={formData.payment === 'cod'} 
                          onChange={handleChange}
                          className="radio radio-pink radio-sm"
                        />
                        <div className="flex-1 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-money-bill-wave text-green-600"></i>
                            </div>
                            <div>
                              <p className="font-medium">เก็บเงินปลายทาง (COD)</p>
                              <p className="text-xs text-gray-500">ชำระเงินเมื่อได้รับสินค้า</p>
                            </div>
                          </div>
                          <i className="fas fa-check-circle text-green-500 text-xl"></i>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all hover:border-pink-300">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="card" 
                          onChange={handleChange}
                          className="radio radio-pink radio-sm"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-credit-card text-blue-600"></i>
                            </div>
                            <div>
                              <p className="font-medium">บัตรเครดิต / เดบิต</p>
                              <p className="text-xs text-gray-500">Visa, Mastercard, JCB</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="mt-4 flex gap-2 justify-end">
                      <i className="fab fa-cc-visa text-3xl text-gray-400"></i>
                      <i className="fab fa-cc-mastercard text-3xl text-gray-400"></i>
                      <i className="fab fa-cc-jcb text-3xl text-gray-400"></i>
                      <i className="fas fa-university text-3xl text-gray-400"></i>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h4 className="font-semibold text-gray-800 mb-3">สรุปคำสั่งซื้อ</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">สินค้า</span>
                        <span className="font-medium">{formData.package}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">การจัดส่ง</span>
                        <span className="text-green-600">ฟรี</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>ยอดรวมทั้งสิ้น</span>
                          <span className="text-pink-600 text-lg">
                            {formData.package.includes("690") && "690"}
                            {formData.package.includes("1,290") && "1,290"}
                            {formData.package.includes("2,400") && "2,400"}
                            .-
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={prevStep} 
                      className="btn btn-outline w-1/2 border-pink-300 text-pink-600 hover:bg-pink-50"
                    >
                      <i className="fas fa-chevron-left mr-2"></i>
                      ย้อนกลับ
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={submitOrder}
                      disabled={isSubmitting}
                      className="btn bg-gradient-to-r from-green-500 to-emerald-600 text-white w-1/2 shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          กำลังดำเนินการ...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check-circle mr-2"></i>
                          ยืนยันสั่งซื้อ
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FastCheckout;