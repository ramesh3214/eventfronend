import React from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Banner = () => {
  const [text] = useTypewriter({
    words: ["Luxury Weddings.", "Corporate Events.", "Exclusive Parties."],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });

  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-6 lg:px-20 py-16 relative">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-12">
        <div className="text-center md:text-left flex flex-col gap-6 max-w-2xl">
          <h4  style={{fontFamily:"outfit-semibold"}}  className="text-lg font-semibold uppercase tracking-widest text-gray-700">
            Your Event, Your Signature
          </h4>
          <h1  style={{fontFamily:"outfit-bold"}}  className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Experience Unforgettable <br />
            <span className="text-[#D4AF37]">Moments & Occasions</span>
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Specialized in{" "}
            <span className="text-[#D4AF37]">{text}</span>
            <Cursor cursorStyle="|" cursorColor="#D4AF37" />
          </h2>
          <p  style={{fontFamily:"outfit-medium"}}  className="text-lg text-gray-600 leading-relaxed">
            We help you plan &amp; book luxury events effortlessly. From high-profile weddings to corporate summits, we ensure seamless event execution with premium service &amp; attention to detail.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <Link
              to="/event"
              style={{fontFamily:"outfit-bold"}}
              className="px-8 py-1  rounded-full bg-[#D4AF37] text-white  shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Explore Events
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
