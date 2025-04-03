import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./Authcontext";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const { setIsLogin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const formData = {
        name,
        email,
        number,
        password,
      };
      const response = await fetch(
        "http://localhost/phpbackend/auth/Register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const textResponse = await response.text();

      
      const jsonObjects = textResponse.trim().split(/(?<=\})(?=\{)/);
      const data = JSON.parse(jsonObjects[1]);

      if (data.success) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <Toaster position="top-center" />
      <div className="flex flex-col pt-0 md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-200">
          <img
            src="https://img.freepik.com/free-psd/food-drive-template-design_23-2151006733.jpg?t=st=1743115965~exp=1743119565~hmac=b84018a5102df28432485a089c41cc11a6ee86b25ee70bdfe84d9d80ca57d657&w=1800"
            alt="Signup"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2
            style={{ fontFamily: "outfit-bold" }}
            className="text-4xl font-bold text-center mb-4 text-gray-800"
          >
            Create Account
          </h2>
          <p
            style={{ fontFamily: "outfit-medium" }}
            className="text-center text-gray-500 mb-6"
          >
            Sign up to get started
          </p>
          <form onSubmit={handleSignup} className="space-y-5">
            <input
              type="text"
              value={name}
              style={{ fontFamily: "outfit-medium" }}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="email"
              value={email}
              style={{ fontFamily: "outfit-medium" }}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="tel"
              value={number}
              style={{ fontFamily: "outfit-medium" }}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="1234567890"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="password"
              value={password}
              style={{ fontFamily: "outfit-medium" }}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="password"
              style={{ fontFamily: "outfit-medium" }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button
              type="submit"
              style={{ fontFamily: "outfit-medium" }}
              disabled={loading}
              className="w-full py-3 text-lg cursor-pointer font-semibold text-white bg-[#D4AF37] rounded-lg hover:bg-[#cfa83a] transition-colors"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p
            style={{ fontFamily: "outfit-medium" }}
            className="mt-4 text-center text-gray-500"
          >
            Already have an account?{" "}
            <Link
              style={{ fontFamily: "outfit-medium" }}
              to="/login"
              className="text-[#D4AF37] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
