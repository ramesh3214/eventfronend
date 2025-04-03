import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiMail,
  FiSmartphone,
  FiCheckCircle,
  FiAlertCircle,
  FiUsers
} from "react-icons/fi";

const CateringDetail = () => {
  const location = useLocation();
  const { event } = location.state || {};

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Catering Service Selected
          </h1>
          <p className="text-gray-600 mb-6">
            Please select a catering service from our listing.
          </p>
          <Link
            to="/event"
            className="bg-[#D4AF37] text-white px-6 py-2 rounded-lg hover:bg-[#cfa83a] transition-colors"
            style={{ fontFamily: "outfit-bold" }}
          >
            Back to Catering
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
        
          <div className="relative lg:border-r border-gray-200">
            <div className="relative h-96 overflow-hidden">
              <img
                src={event.image_url}
                alt={event.name}
                className="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  {event.name}
                </h2>
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-gray-200">{event.location}</span>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-4">
                {event.email && (
                  <a 
                    href={`mailto:${event.email}`}
                    className="flex items-center gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  >
                    <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                      <FiMail className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-700 font-medium">{event.email}</p>
                    </div>
                  </a>
                )}

                {event.phone && (
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                      <FiSmartphone className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-700 font-medium">{event.phone}</p>
                    </div>
                  </div>
                )}

                {event.foodAvailable !== undefined && (
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                      {event.foodAvailable ? (
                        <FiCheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <FiAlertCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Food Availability</p>
                      <p className="text-gray-700 font-medium">
                        {event.foodAvailable ? "Available" : "Not Available"}
                      </p>
                    </div>
                  </div>
                )}

                {event.totalregistered && (
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                      <FiUsers className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Registered</p>
                      <p className="text-gray-700 font-medium">
                        {event.totalregistered.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          
          <div className="p-8 lg:p-12 bg-white">
            <div className="max-w-2xl mx-auto">
              <h1
                className="text-4xl font-bold text-gray-800 mb-8 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-[#D4AF37] after:mt-4"
                style={{ fontFamily: "outfit-bold" }}
              >
                About Our Service
              </h1>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  At <span className="font-semibold text-[#D4AF37]">{event.name}</span>, 
                  we specialize in crafting unforgettable culinary experiences. 
                  Nestled in the heart of <span className="font-semibold">{event.location}</span>, 
                  our team transforms events into lasting memories through:
                </p>
                
                <ul className="grid gap-4 sm:grid-cols-2">
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="flex-shrink-0 w-5 h-5 text-[#D4AF37]" />
                    <span className="text-gray-600">Premium Ingredients</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="flex-shrink-0 w-5 h-5 text-[#D4AF37]" />
                    <span className="text-gray-600">Custom Menus</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="flex-shrink-0 w-5 h-5 text-[#D4AF37]" />
                    <span className="text-gray-600">Professional Staff</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="flex-shrink-0 w-5 h-5 text-[#D4AF37]" />
                    <span className="text-gray-600">Event Planning</span>
                  </li>
                </ul>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mt-8">
                    Our Commitment
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We combine culinary artistry with meticulous service to create 
                    seamless events. From intimate gatherings to grand celebrations, 
                    our attention to detail ensures every aspect exceeds expectations.
                  </p>
                </div>
              </div>

              {event.email && (
                <a
                  href={`mailto:${event.email}`}
                  className="mt-12 inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-white px-8 py-3.5 rounded-lg hover:bg-[#c0a042] transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                  style={{ fontFamily: "outfit-bold" }}
                >
                  <FiMail className="w-5 h-5" />
                  Contact Us
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CateringDetail;