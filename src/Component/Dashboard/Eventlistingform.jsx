import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EventListingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    image: "",
    location: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const Navigate=useNavigate();

  const categories = ["Conference", "Startup", "Workshop", "Community"];

  
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(
        "https://eventfrontend-nep5.onrender.com/api/events",
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
      const data = await response.json();
      setSuccess("Event created successfully!");

      setFormData({
        name: "",
        description: "",
        date: "",
        time: "",
        image: "",
        location: "",
        category: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    Navigate("/")
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
          Create New Event
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
              Event Name
            </label>
            <input
              type="text"
              style={{ fontFamily: "outfit-medium" }}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter event name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              style={{ fontFamily: "outfit-semibold" }}
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              style={{ fontFamily: "outfit-medium" }}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                style={{ fontFamily: "outfit-semibold" }}
                htmlFor="date"
                className="block text-gray-700 font-medium mb-2"
              >
                Date
              </label>
              <input
                type="date"
                style={{ fontFamily: "outfit-medium" }}
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label
                style={{ fontFamily: "outfit-semibold" }}
                htmlFor="time"
                className="block text-gray-700 font-medium mb-2"
              >
                Time
              </label>
              <input
                style={{ fontFamily: "outfit-medium" }}
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div>
            <label
              style={{ fontFamily: "outfit-semibold" }}
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              Event Image URL
            </label>
            <input
              style={{ fontFamily: "outfit-medium" }}
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              id="location"
              name="location"
              style={{ fontFamily: "outfit-medium" }}
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              style={{ fontFamily: "outfit-semibold" }}
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              style={{ fontFamily: "outfit-medium" }}
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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
              {loading ? "Submitting..." : "Create Event"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EventListingForm;
