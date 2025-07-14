import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiEdit,
} from "react-icons/fi";
import axios from "axios";
import defaultPfp from '../../assets/Default_pfp.jpg';
import { useAuth } from '../../context/AuthContext';

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem('refresh');
      if (refresh) {
        await axios.post('http://127.0.0.1:8000/api/auth/logout/', { refresh });
      }
    } catch (err) {
      // Optionally handle error
    } finally {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('storage'));
      window.location.reload(); // Or update state/UI as needed
    }
  };

  const { user } = useAuth();
  const profilePic = user && user.profile_picture ? user.profile_picture : defaultPfp;

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)}>
        <img
          src={profilePic}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border hover:ring-2 hover:ring-red-500 transition"
          onError={e => { e.target.onerror = null; e.target.src = defaultPfp; }}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl py-2 z-50 border border-gray-200">
          <Link
            to={user && user.id ? `/profile/${user.id}` : "/login"}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
          >
            <FiUser className="text-gray-500" />
            Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
          >
            <FiSettings className="text-gray-500" />
            Settings
          </Link>
          <Link
            to="/write-blog"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
          >
            <FiEdit className="text-gray-500" />
            Write Blog
          </Link>
          <hr className="my-1 border-gray-200" />
          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
            onClick={handleLogout}
          >
            <FiLogOut className="text-red-400" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
