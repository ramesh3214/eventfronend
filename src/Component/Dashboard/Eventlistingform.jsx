import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Authcontext from "../User/Authcontext/Authcontext";

const Eventlistingform = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(Authcontext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(
        "http://localhost/phpbackend/api/Submitform.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message || "Failed to create event");
      }
      await response.json();
      setSuccess("Event created successfully!");

      
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        image_url: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-white to-blue-50 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10"
      >
        <h2
          style={{ fontFamily: "outfit-bold" }}
          className="text-4xl font-extrabold text-gray-800 mb-8 text-center"
        >
          List Your Event
        </h2>

        {error && (
          <div
            style={{ fontFamily: "outfit-medium" }}
            className="mb-4 text-center text-red-600 font-medium"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{ fontFamily: "outfit-medium" }}
            className="mb-4 text-center text-green-600 font-medium"
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              style={{ fontFamily: "outfit-semibold" }}
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              style={{ fontFamily: "outfit-medium" }}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              style={{ fontFamily: "outfit-semibold" }}
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              style={{ fontFamily: "outfit-medium" }}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              style={{ fontFamily: "outfit-semibold" }}
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              style={{ fontFamily: "outfit-medium" }}
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              style={{ fontFamily: "outfit-semibold" }}
              htmlFor="location"
              className="block text-gray-700 font-medium mb-2"
            >
              Location
            </label>
            <input
              type="text"
              style={{ fontFamily: "outfit-medium" }}
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              style={{ fontFamily: "outfit-semibold" }}
              htmlFor="image_url"
              className="block text-gray-700 font-medium mb-2"
            >
              Image URL
            </label>
            <input
              type="url"
              style={{ fontFamily: "outfit-medium" }}
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <motion.button
              style={{ fontFamily: "outfit-medium" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all"
            >
              {loading ? "Submitting..." : "Submit"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Eventlistingform;
