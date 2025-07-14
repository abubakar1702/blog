import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterestP, FaBell, FaSearch } from "react-icons/fa";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../../pages/auth/Login"
import Register from "../../pages/auth/Register"
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here, e.g., navigate or filter
    if (search.trim()) {
      // Example: redirect to search page
      window.location.href = `/search?q=${encodeURIComponent(search)}`;
    }
  };

  return (
    <nav className="w-full bg-white border-b">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* Center: Logo */}
        <div className="text-3xl font-bold text-gray-900">
          Tech<span className="text-blue-600">Geek</span>
        </div>

        {/* Center: Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center mx-8 flex-1 max-w-md"
        >
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              className="w-full border rounded-full pl-10 pr-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>

        {/* Right: Bell + Avatar */}
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <button
                className="relative text-gray-600 hover:text-black"
                onClick={() => alert('Notifications feature coming soon!')}
              >
                <FaBell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <UserMenu />
            </>
          ) : (
            <>
              <button
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2 rounded-full shadow transition focus:outline-none"
                onClick={() => setShowRegister(true)}
              >
                Join Now
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom Navigation Menu */}
      <div className="border-t">
        <ul className="flex justify-center space-x-8 text-sm font-semibold text-gray-700 py-3">
          <li className="cursor-pointer hover:text-black"><Link to="/">Home</Link></li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/categories/artificial_intelligence">Artificial Intelligence</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/categories/hardware">Hardware</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/categories/gaming">Gaming</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/categories/smartphone">Smartphone</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/categories/how-to">How-To</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/categories/news">News</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/about">About</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <Login 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <Register 
        isOpen={showRegister} 
        onClose={() => setShowRegister(false)} 
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </nav>
  );
};

export default Navbar;
