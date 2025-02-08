import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./Authcontext";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiLogOut,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "https://eventfrontend-nep5.onrender.com/api/mybooking"
        );
        const data = await response.json();

        const userBookings = data.filter(
          (booking) => booking.userId === user.id
        );
        setBookings(userBookings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl shadow-2xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1
                style={{ fontFamily: "outfit-bold" }}
                className="text-4xl font-extrabold"
              >
                Welcome Back, {user.name}!
              </h1>
              <p
                style={{ fontFamily: "outfit-semibold" }}
                className="mt-2 text-lg"
              >
                Here you can manage your bookings and account details.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              style={{ fontFamily: "outfit-semibold" }}
              className="mt-6 cursor-pointer md:mt-0 flex items-center gap-2 bg-[#D4AF37] hover:bg-[#cfa83a] text-white px-6 py-3 rounded-full shadow-lg transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <FiUser className="w-6 h-6 text-blue-600" />
              <h3
                style={{ fontFamily: "outfit-medium" }}
                className="text-xl font-semibold"
              >
                Name
              </h3>
            </div>
            <p className="text-gray-700 text-lg">{user.name}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <FiMail className="w-6 h-6 text-blue-600" />
              <h3
                style={{ fontFamily: "outfit-medium" }}
                className="text-xl font-semibold"
              >
                Email
              </h3>
            </div>
            <p
              style={{ fontFamily: "outfit-medium" }}
              className="text-gray-700 text-lg"
            >
              {user.email}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <FiPhone className="w-6 h-6 text-blue-600" />
              <h3
                style={{ fontFamily: "outfit-medium" }}
                className="text-xl font-semibold"
              >
                Phone
              </h3>
            </div>
            <p
              style={{ fontFamily: "outfit-medium" }}
              className="text-gray-700 text-lg"
            >
              {user.number || "Not provided"}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="mb-6">
            <h2
              style={{ fontFamily: "outfit-bold", textAlign: "center" }}
              className="text-2xl  font-bold text-gray-800"
            >
              Your Bookings
            </h2>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 h-20 rounded-xl"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500 text-lg">{error}</div>
          ) : bookings.length === 0 ? (
            <div
              style={{ fontFamily: "outfit-medium" }}
              className="text-center py-8 text-gray-500 text-lg"
            >
              No bookings found. Start by registering for an event!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <h3
                        style={{ fontFamily: "outfit-bold" }}
                        className="text-2xl font-semibold text-gray-800 mb-2"
                      >
                        {booking.eventName}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:space-x-8 text-gray-600 text-lg">
                        <div
                          style={{ fontFamily: "outfit-semibold" }}
                          className="flex items-center gap-2"
                        >
                          <FiCalendar className="w-5 h-5" />
                          <span>{booking.eventTiming}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <FiMapPin className="w-5 h-5" />
                          <span style={{ fontFamily: "outfit-medium" }}>
                            {booking.eventlocation}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span
                        style={{ fontFamily: "outfit-medium" }}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-lg font-medium"
                      >
                        Confirmed
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
