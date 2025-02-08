import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiCalendar,
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiAlertCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { registration } = location.state || {};

  if (!registration) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="text-center  max-w-md">
          <div className="mb-6 text-6xl text-gray-400">
            <FiHome />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Booking Found
          </h1>
          <p
            style={{ fontFamily: "outfit-bold" }}
            className="text-gray-600 mb-6"
          >
            It seems you haven't made any bookings yet. Let's find your next
            great experience!
          </p>
          <button
            style={{ fontFamily: "outfit-bold" }}
            onClick={() => navigate("/events")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 text-center">
          <div className="mb-4 flex justify-center">
            <FiCheckCircle className="w-16 h-16 text-white/90" />
          </div>
          <h1
            style={{ fontFamily: "outfit-bold" }}
            className="text-3xl font-bold mb-2"
          >
            Booking Confirmed!
          </h1>
          <p
            style={{ fontFamily: "outfit-semibold" }}
            className="text-lg opacity-90"
          >
            Your registration was successful
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-6 rounded-xl">
              <h2
                style={{ fontFamily: "outfit-bold" }}
                className="text-xl font-semibold text-indigo-800 mb-4 flex items-center gap-2"
              >
                <FiCalendar className="w-5 h-5" />
                Event Details
              </h2>
              <dl className="space-y-3">
                <DetailItem
                  style={{ fontFamily: "outfit-medium" }}
                  label="Event Name"
                  value={registration.eventName}
                />
                <DetailItem
                  style={{ fontFamily: "outfit-medium" }}
                  label="Category"
                  value={registration.eventCategory}
                />
                <DetailItem
                  style={{ fontFamily: "outfit-medium" }}
                  label="Date & Time"
                  value={registration.eventTiming}
                />
              </dl>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h2
                style={{ fontFamily: "outfit-bold" }}
                className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"
              >
                <FiUser className="w-5 h-5" />
                Your Details
              </h2>
              <dl className="space-y-3">
                <DetailItem
                  style={{ fontFamily: "outfit-semibold" }}
                  label="Name"
                  value={registration.userName}
                  icon={FiUser}
                />
                <DetailItem
                  style={{ fontFamily: "outfit-semibold" }}
                  label="Email"
                  value={registration.userEmail}
                  icon={FiMail}
                />
                <DetailItem
                  style={{ fontFamily: "outfit-semibold" }}
                  label="Phone"
                  value={registration.userNumber}
                  icon={FiPhone}
                />
              </dl>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ fontFamily: "outfit-bold" }}
              onClick={() => navigate("/profile")}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              <FiHome className="w-5 h-5 inline mr-2" />
              Go to Dashboard
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const DetailItem = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-3">
    {Icon && <Icon className="w-5 h-5 text-gray-500" />}
    <div>
      <dt className="text-sm font-medium text-gray-600">{label}</dt>
      <dd className="text-gray-800 font-medium">{value}</dd>
    </div>
  </div>
);

export default BookingConfirmationPage;
