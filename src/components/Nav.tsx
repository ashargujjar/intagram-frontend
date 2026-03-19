import {
  FaHome,
  FaSearch,
  FaCompass,
  FaUser,
  FaCog,
  FaPlusSquare,
  FaBell,
  FaUserPlus,
  FaSignOutAlt, // <-- 1. Imported the Sign Out icon
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Untitled design (1).png";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// The navigation data array (Pages to route to)
const navLinks = [
  { name: "Home", icon: <FaHome />, path: "/home" },
  { name: "Explore", icon: <FaCompass />, path: "/explore" },
  { name: "Search", icon: <FaSearch />, path: "/search" },
  { name: "Notifications", icon: <FaBell />, path: "/notifications" },
  { name: "Send Request", icon: <FaUserPlus />, path: "/send-request" },
  { name: "Create Photo", icon: <FaPlusSquare />, path: "/createPost" },
  { name: "Profile", icon: <FaUser />, path: "/profile" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Setup navigate for when you eventually write the logout logic
  const navigate = useNavigate();

  const handleLogout = () => {
    // Later, you will clear your JWT token or LocalStorage here
    console.log("User logged out!");
    // navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border border-gray-100 rounded-xl sm:sticky sm:top-6">
      {/* --- MOBILE HEADER --- */}
      <div className="flex items-center justify-between p-4 sm:hidden">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="RABTA Logo"
            className="w-10 h-10 object-cover rounded-full shadow-sm"
          />
          <span className="font-semibold text-[#1E4F7A]">Rabta</span>
        </div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full border border-[#E6EEF5] flex items-center justify-center text-[#1E4F7A] hover:bg-[#F6FBFF] transition"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* --- DESKTOP LOGO --- */}
      <div className="hidden sm:flex justify-center sm:justify-start p-6 pb-0">
        <img
          src={logo}
          alt="RABTA Logo"
          className="w-16 h-16 object-cover rounded-full shadow-sm"
        />
      </div>

      {/* --- NAVIGATION LINKS --- */}
      <div className={`${isOpen ? "block" : "hidden"} sm:block`}>
        <ul className="flex flex-col gap-2 flex-1 p-4 sm:p-6 sm:pt-10">
          {navLinks.map((link) => (
            <Link
              to={link.path}
              key={link.name}
              className="group flex items-center gap-4 w-full py-3 px-4 cursor-pointer rounded-lg transition-all duration-300
                         hover:bg-gradient-to-r hover:from-[#1E4F7A] hover:to-[#F2A32C] hover:shadow-md"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-[#1E4F7A] group-hover:text-white transition-colors text-xl">
                {link.icon}
              </span>

              <span className="text-[#1E4F7A] font-semibold group-hover:text-white transition-colors text-lg">
                {link.name}
              </span>
            </Link>
          ))}
        </ul>

        {/* --- LOGOUT BUTTON --- */}
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 sm:pt-0 border-t border-gray-100 sm:border-t-0">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-4 w-full py-3 px-4 cursor-pointer rounded-lg transition-all duration-300
                       hover:bg-red-50 hover:shadow-sm"
          >
            <span className="text-[#1E4F7A] group-hover:text-red-600 transition-colors text-xl">
              <FaSignOutAlt />
            </span>

            <span className="text-[#1E4F7A] font-semibold group-hover:text-red-600 transition-colors text-lg">
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
