import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./Authcontext";
import toast, { Toaster } from "react-hot-toast";

const Signin = () => {
  const { setIsLogin, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const formData = { email, password };

      const response = await fetch(
        "http://localhost/phpbackend/auth/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const textResponse = await response.text();

      
      const jsonObjects = textResponse.trim().split(/(?<=\})(?=\{)/);
      const data = JSON.parse(jsonObjects[1]);
      console.log(data);

      if (data.success) {
        
        setUser(data.user);
        setIsLogin(true);
        alert("Login Successful!");
        navigate("/");
      } else {
        alert(data.message || "Invalid credentials.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const guestUser = { name: `Guest${randomNumber}`, email: "", guest: true };
    localStorage.setItem("user", JSON.stringify(guestUser));
    setUser(guestUser);
    setIsLogin(true);
    toast.success("Logged in as Guest!");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <Toaster position="top-center" />
      <div className="flex flex-col pt-0 md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-200">
          <img
            src="https://img.freepik.com/free-psd/food-drive-template-design_23-2151006733.jpg?t=st=1743115965~exp=1743119565~hmac=b84018a5102df28432485a089c41cc11a6ee86b25ee70bdfe84d9d80ca57d657&w=1800"
            alt="Signin"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2
            style={{ fontFamily: "outfit-bold" }}
            className="text-4xl font-bold text-center mb-4 text-gray-800"
          >
            Welcome Back!
          </h2>
          <p
            style={{ fontFamily: "outfit-semibold" }}
            className="text-center text-gray-500 mb-6"
          >
            Sign in to your account
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              style={{ fontFamily: "outfit-medium" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div className="relative">
              <input
                style={{ fontFamily: "outfit-medium" }}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            <button
              style={{ fontFamily: "outfit-medium" }}
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-semibold cursor-pointer text-white bg-[#D4AF37] rounded-lg hover:bg-[#cfa83a] transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-8 space-y-4">
            <p
              style={{ fontFamily: "outfit-medium" }}
              className="text-center text-gray-500 text-sm"
            >
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#D4AF37] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
            <button
              style={{ fontFamily: "outfit-medium" }}
              onClick={loginAsGuest}
              className="w-full py-3 cursor-pointer text-lg font-semibold text-[#D4AF37] border-2 border-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              Login as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
