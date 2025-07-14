import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiEdit,
} from "react-icons/fi";
=======
import { FiUser, FiSettings, FiLogOut, FiEdit } from "react-icons/fi";
>>>>>>> c841de7 (Initial commit from second computer)
import axios from "axios";
import defaultPfp from '../../assets/Default_pfp.jpg';
import { useAuth } from '../../context/AuthContext';

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
<<<<<<< HEAD
=======
  const { user } = useAuth();
>>>>>>> c841de7 (Initial commit from second computer)

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
<<<<<<< HEAD
      // Optionally handle error
=======
      console.error("Logout error:", err);
>>>>>>> c841de7 (Initial commit from second computer)
    } finally {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('storage'));
<<<<<<< HEAD
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
=======
      window.location.href = '/';
    }
  };

  const getProfilePicture = () => {
    if (!user || !user.profile_picture) return defaultPfp;
    
    const hasQuery = user.profile_picture.includes('?');
    return `${user.profile_picture}${hasQuery ? '&' : '?'}t=${new Date().getTime()}`;
  };

  const profilePic = getProfilePicture();

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setOpen(!open)}
        className="focus:outline-none"
        aria-label="User menu"
        aria-expanded={open}
      >
        <img
          src={profilePic}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-red-400 transition-all duration-200 object-cover"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = defaultPfp;
          }}
>>>>>>> c841de7 (Initial commit from second computer)
        />
      </button>

      {open && (
<<<<<<< HEAD
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
=======
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100 divide-y divide-gray-100">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.full_name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || ''}
            </p>
          </div>
          
          <div className="py-1">
            <Link
              to={user?.id ? `/profile/${user.id}` : "/login"}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <FiUser className="text-gray-500 flex-shrink-0" />
              <span>Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <FiSettings className="text-gray-500 flex-shrink-0" />
              <span>Settings</span>
            </Link>
            <Link
              to="/write-blog"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <FiEdit className="text-gray-500 flex-shrink-0" />
              <span>Write Blog</span>
            </Link>
          </div>
          
          <div className="py-1">
            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              onClick={handleLogout}
            >
              <FiLogOut className="text-red-500 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
>>>>>>> c841de7 (Initial commit from second computer)
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default UserMenu;
=======
export default UserMenu;
>>>>>>> c841de7 (Initial commit from second computer)
