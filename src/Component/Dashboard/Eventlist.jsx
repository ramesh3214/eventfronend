import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";

const Eventlist = () => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      
      const response = await axios.get("http://localhost/phpbackend/api/Getform.php", { responseType: "text" });
      const textData = response.data.trim();
      const jsonObjects = textData.split(/(?<=\})(?=\{)/);
      if (jsonObjects.length >= 2) {
        const secondJson = JSON.parse(jsonObjects[1]);
        if (secondJson.success) {
          const eventsWithFoodStatus = secondJson.data.map((event) => ({
            ...event,
            foodAvailable: Math.random() < 0.5,
          }));
          setEventData(eventsWithFoodStatus);
        } else {
          console.error("Error in response:", secondJson.message);
        }
      } else {
        console.error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
          Catering List
        </motion.h1>
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index}/>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {eventData.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                className="relative cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={event.image_url}
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: "outfit-medium" }} className="text-2xl font-semibold mb-2 text-gray-800">
                    {event.name}
                  </h3>
                  <p style={{ fontFamily: "outfit-medium" }} className="text-gray-600 text-sm mb-2">
                    Email: {event.email}
                  </p>
                  <p style={{ fontFamily: "outfit-medium" }} className="text-gray-600 text-sm mb-2">
                    Phone: {event.phone}
                  </p>
                  <p style={{ fontFamily: "outfit-medium" }} className="text-gray-600 text-sm mb-4">
                    Location: {event.location}
                  </p>
                  <div className="flex items-center mb-4">
                    <span className={`text-sm font-medium ${event.foodAvailable ? "text-green-600" : "text-red-600"}`}>
                      Food {event.foodAvailable ? "Available" : "Not Available"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to={`/registration`} style={{ fontFamily: "outfit-medium" }}state={{event}} >
                      <button className="w-full cursor-pointer py-2 rounded-lg text-white font-semibold bg-[#D4AF37] hover:bg-[#cfa83a] transition-colors">
                        View Details
                      </button>
                    </Link>
                    {event.foodAvailable ? (
                      <a href={`tel:${event.phone}`} style={{ fontFamily: "outfit-medium" }}>
                        <button className="w-full flex items-center justify-center gap-2 cursor-pointer py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition-colors">
                          <FaPhone /> Call Now
                        </button>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 cursor-not-allowed py-2 rounded-lg text-white font-semibold bg-gray-400"
                      >
                        Food Not Available
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventlist;
