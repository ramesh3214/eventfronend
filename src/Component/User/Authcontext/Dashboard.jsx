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
                Here you can manage your account details.
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
      </div>
    </div>
  );
};

export default Dashboard;
