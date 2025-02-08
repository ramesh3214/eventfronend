import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Authcontext from "../User/Authcontext/Authcontext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, Login, logout } = useContext(Authcontext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full z-50 mt-0.5 transition-all duration-300 ${
        isScrolled ? "bg-transparent " : "bg-gradient-to-br from-white to-blue-50"
      }`}
    >
      <nav className="sticky top-0 z-50 mx-4">
        <div className="bg-gradient-to-br h-4 from-white to-blue-50 p-0.5 ">
          <div className="bg-white rounded-3xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-8">
                  <Link
                    to="/"
                    style={{fontFamily:"outfit-bold"}}
                    className="text-[#D4AF37]"
                  >
                    OSM EVENTS
                  </Link>
                  <div className="hidden md:flex items-center space-x-6">
                    <Link
                      to="/eventform"
                      style={{fontFamily:"outfit-semibold"}}
                      className="relative group text-gray-800 hover:text-[#D4AF37] transition-colors duration-200 font-medium text-sm"
                    >
                      Eventform
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                    <Link
                      to="/"
                      style={{fontFamily:"outfit-semibold"}}
                      className="relative group text-gray-800 hover:text-[#D4AF37] transition-colors duration-200 font-medium text-sm"
                    >
                      Home
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                   
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative ml-2">
                    {Login ? (
                      <>
                        <button
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          className="flex items-center gap-2 focus:outline-none"
                        >
                          <div  style={{fontFamily:"outfit-semibold"}} className="h-9 w-9 cursor-pointer rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        </button>
                        {isProfileOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100">
                            <Link
                             style={{fontFamily:"outfit-semibold"}}
                              to="/profile"
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              My Profile
                            </Link>
                           
                            <button
                              onClick={logout}
                              style={{fontFamily:"outfit-semibold"}}
                              className="w-full text-left px-4 cursor-pointer py-3 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to="/login"
                        style={{fontFamily:"outfit-semibold"}}
                        className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#cfa83a] transition-colors duration-200 text-sm font-medium"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                  <div className="md:hidden">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-2 text-gray-800 hover:text-[#D4AF37] focus:outline-none"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {isMenuOpen ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {isMenuOpen && (
                <div style={{background:'transparent'}} className="md:hidden mt-2 ">
                  <div className="px-4 py-4 space-y-4">
                    <Link
                      to="/eventform"
                      onClick={() => setIsMenuOpen(false)}
                      style={{fontFamily:"outfit-semibold"}}
                      className="block text-gray-800 hover:text-[#D4AF37] transition-colors font-medium text-sm"
                    >
                      Eventform
                    </Link>
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      style={{fontFamily:"outfit-semibold"}}
                      className="block text-gray-800 hover:text-[#D4AF37] transition-colors font-medium text-sm"
                    >
                      Home
                    </Link>
                   
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
