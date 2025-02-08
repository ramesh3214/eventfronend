import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./Authcontext";
import {
  FiUser,
  FiMail,
  FiSmartphone,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";

const RegistrationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { event } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://eventfrontend-nep5.onrender.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            eventId: event._id,
            eventName: event.name,
            eventCategory: event.category,
            name: formData.name,
            email: formData.email,
            number: formData.number,
          }),
        }
      );
      if (!response.ok) throw new Error("Registration failed");

      const registrationData = await response.json();
      setSuccess("Registration successful!");
      setFormData({ name: "", email: "", number: "" });

      navigate("/booking-confirmation", {
        state: { registration: registrationData },
      });
    } catch (err) {
      setError(
        err.message ||
          "There was an error submitting your registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Event Selected
          </h1>
          <p className="text-gray-600 mb-6">
            Please select an event to register from the events page.
          </p>
          <button
            style={{ fontFamily: "outfit-bold" }}
            onClick={() => navigate("/event")}
            className="bg-[#D4AF37] text-white px-6 py-2 rounded-lg hover:bg-[#cfa83a] transition-colors"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-400 p-8 text-white">
            <div className="space-y-6">
              <h1
                style={{ fontFamily: "outfit-medium" }}
                className="text-4xl font-bold leading-tight"
              >
                {event.name}
              </h1>
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FiCalendar className="w-6 h-6 text-white" />
                  <span
                    style={{ fontFamily: "outfit-medium" }}
                    className="text-lg"
                  >
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    • {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMapPin className="w-6 h-6 text-white" />
                  <span
                    style={{ fontFamily: "outfit-medium" }}
                    className="text-lg"
                  >
                    {event.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiUsers className="w-6 h-6 text-white" />
                  <span
                    style={{ fontFamily: "outfit-medium" }}
                    className="text-lg"
                  >
                    {event.totalregistered.toLocaleString()} Registered
                  </span>
                </div>
              </div>
              <p className="text-gray-100 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          
          <div className="p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h2
                style={{ fontFamily: "outfit-bold" }}
                className="text-3xl font-bold text-gray-800 mb-8"
              >
                Complete Your Registration
              </h2>

              {error && (
                <div
                  style={{ fontFamily: "outfit-medium" }}
                  className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3"
                >
                  <FiAlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              {success && (
                <div
                  style={{ fontFamily: "outfit-medium" }}
                  className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3"
                >
                  <FiCheckCircle className="w-5 h-5" />
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    style={{ fontFamily: "outfit-medium" }}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{ fontFamily: "outfit-medium" }}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{ fontFamily: "outfit-medium" }}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiSmartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 cursor-pointer bg-[#D4AF37] hover:bg-[#cfa83a] text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className=" cursor-pointer animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </motion.button>
              </form>

              {user && (
                <p
                  style={{ fontFamily: "outfit-medium" }}
                  className="mt-6 text-sm text-gray-500 text-center"
                >
                  Logged in as {user.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationPage;
