import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { motion } from "framer-motion";

const Eventlist = () => {
  const [eventData, setEventData] = useState([]);
  const [timeFilter, setTimeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      const response = await axios.get("https://eventfrontend-nep5.onrender.com/api/eventslist");
      setEventData(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    const socket = io("https://eventfrontend-nep5.onrender.com");
    socket.on("newEvent", (newEvent) => {
      setEventData((prevData) => [newEvent, ...prevData]);
    });
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = eventData.filter((event) => {
    const eventDate = new Date(event.date);
    let timeMatch = true;
    if (timeFilter === "upcoming") {
      timeMatch = eventDate >= today;
    } else if (timeFilter === "past") {
      timeMatch = eventDate < today;
    }
    const categoryMatch =
      categoryFilter === "All" || event.category === categoryFilter;
    return timeMatch && categoryMatch;
  });

  const categories = ["All", ...new Set(eventData.map((event) => event.category))];

  const SkeletonCard = () => (
    <div className="animate-pulse border border-gray-200 rounded-2xl shadow-md p-6">
      <div className="bg-gray-300 h-48 w-full rounded-md"></div>
      <div className="mt-4 space-y-2">
        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-full rounded"></div>
        <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
        <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-white to-blue-50 py-10 px-4 md:px-8 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center"
          style={{ fontFamily: "outfit-bold" }}
        >
          Event List
        </motion.h1>

      
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-row items-center justify-around gap-4">
            <div className="flex flex-col items-center">
              <span style={{ fontFamily: "outfit-bold" }} className="text-xs font-semibold text-gray-600 mb-1">
                Time
              </span>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-32 cursor-pointer border border-gray-300 rounded-full px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ fontFamily: "outfit-medium" }}
              >
                <option value="all">All</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div className="flex flex-col items-center">
              <span style={{ fontFamily: "outfit-bold" }} className="text-xs font-semibold text-gray-600 mb-1">
                Category
              </span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-32 cursor-pointer border border-gray-300 rounded-full px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ fontFamily: "outfit-medium" }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
           
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => {
              const eventDate = new Date(event.date);
              const isPast = eventDate < today;
              return (
                <motion.div
                  key={event._id}
                  whileHover={{ scale: 1.02 }}
                  className="relative cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                    {isPast && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span style={{ fontFamily: "outfit-medium" }} className="text-white text-xl font-bold">
                          Event Passed
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 style={{ fontFamily: "outfit-medium" }} className="text-2xl font-semibold mb-2 text-gray-800">
                      {event.name}
                    </h3>
                    <p style={{ fontFamily: "outfit-medium" }} className="text-gray-600 text-sm mb-4">
                      {event.description}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span style={{ fontFamily: "outfit-medium" }}>
                        {eventDate.toLocaleDateString()} at {eventDate.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span style={{ fontFamily: "outfit-medium" }}>{event.location}</span>
                    </div>
                    <div style={{ fontFamily: "outfit-medium" }} className="text-sm text-gray-500 mb-4">
                      Total Registered: {event.totalregistered}
                    </div>
                    <Link to="/registration" style={{ fontFamily: "outfit-medium" }} state={{ event, eventId: event._id }}>
                      <button
                        disabled={isPast}
                        className={`w-full cursor-pointer py-2 rounded-lg text-white font-semibold transition-colors ${
                          isPast ? "bg-gray-400 cursor-not-allowed" : "bg-[#D4AF37] hover:bg-[#cfa83a]"
                        }`}
                      >
                        {isPast ? "Event Passed" : "Register"}
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventlist;
