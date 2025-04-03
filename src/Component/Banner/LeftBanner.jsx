import React from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { FiArrowRight, FiStar, FiShield } from "react-icons/fi";
import Avatar from "@mui/material/Avatar";

const Banner = () => {
  const [text] = useTypewriter({
    words: ["Trusted Caterers", "Quality Services", "Reliable Partners", "NGO Specialists"],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });

  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-6 lg:px-20 py-24 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left flex flex-col gap-8 max-w-2xl"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center md:justify-start gap-3"
          >
            <FiShield className="w-6 h-6 text-[#D4AF37]" />
            <h4 
              style={{ fontFamily: "outfit-semibold" }} 
              className="text-lg font-semibold uppercase tracking-widest text-gray-700"
            >
              Your Catering, Your Impact
            </h4>
          </motion.div>

          <h1 
            style={{ fontFamily: "outfit-bold" }} 
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            Elevate NGO Events with <br />
            <span className="text-[#D4AF37] relative inline-block">
              Premium Catering
              <FiStar className="absolute -top-4 -right-6 w-8 h-8 text-[#D4AF37]/50" />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-semibold text-gray-700 min-h-[2.5rem]"
          >
            Specializing in{" "}
            <span className="text-[#D4AF37] relative">
              {text}
              <Cursor 
                cursorStyle="|" 
                cursorColor="#D4AF37"
                cursorBlinking="true"
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ fontFamily: "outfit-medium" }} 
            className="text-lg text-gray-600 leading-relaxed max-w-3xl"
          >
            Connect with verified catering partners specializing in NGO events. 
            Our curated platform ensures quality, reliability, and social impact 
            for every gathering, conference, or community program.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-6 mt-4"
          >
            <Link
              to="/event"
              style={{ fontFamily: "outfit-bold" }}
              className="px-8 py-4 rounded-xl bg-[#D4AF37] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group"
            >
              <span>Explore Caterers</span>
              <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <div className="flex items-center gap-3 text-gray-600">
              <div className="flex -space-x-2">
                <Avatar 
                  alt="NGO 1" 
                  src="https://source.unsplash.com/random/100x100/?face" 
                  className="w-8 h-8 border-2 border-white" 
                />
                <Avatar 
                  alt="NGO 2" 
                  src="https://source.unsplash.com/random/100x100/?person" 
                  className="w-8 h-8 border-2 border-white" 
                />
                <Avatar 
                  alt="NGO 3" 
                  src="https://source.unsplash.com/random/100x100/?portrait" 
                  className="w-8 h-8 border-2 border-white" 
                />
              </div>
              <span className="text-sm">Join 500+ NGOs served</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Right Section */}
        <div className="hidden lg:block flex-1 relative">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#D4AF37]/10 via-transparent to-transparent rounded-3xl" />
          <div className="relative grid grid-cols-2 gap-6 w-full max-w-xl ml-auto">
            <div className="col-span-1 space-y-6">
              <div className="h-48 bg-white rounded-2xl shadow-lg  border border-gray-100">
                <img 
                  src="https://img.freepik.com/free-photo/portrait-indian-boy-bazaar_23-2150913366.jpg?t=st=1743139595~exp=1743143195~hmac=fda9c3a9516a76c4f8572fef4f7965869a2e7c9ba244c55602086c4d13b21159&w=740" 
                  alt="Catering" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-32 bg-[#D4AF37]/10 rounded-2xl p-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#D4AF37]">100% Verified</span>
              </div>
            </div>
            <div className="col-span-1 space-y-6 mt-12">
              <div className="h-32 bg-[#D4AF37]/10 rounded-2xl p-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#D4AF37]">24/7 Support</span>
              </div>
              <div className="h-48 bg-white rounded-2xl shadow-lg  border border-gray-100">
                <img 
                  src="https://img.freepik.com/free-photo/group-diverse-people-holding-hands-up-air_53876-105341.jpg?t=st=1743139655~exp=1743143255~hmac=6f3f526d50bd8a735069214ce0856962c21927f631cc3718b380e76f1b04080a&w=740" 
                  alt="Event" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
