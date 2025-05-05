import React, { useEffect } from 'react';
import useUserContext from '../context/UserContext';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Profile() {
  const { userId, userName, userEmail, isLogin, setUserId, setUserName, setUserEmail, setIsLogin } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      toast.error("Please login to access this page.");
      navigate("/");
    }
  }, [isLogin, navigate]);

  const handleLogout = () => {
    setUserId(null);
    setUserName(null);
    setUserEmail(null);
    setIsLogin(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Your Profile</h2>

          <div className="space-y-4 text-lg text-gray-700 mb-6">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">User ID:</span>
              <span>{userId}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Name:</span>
              <span>{userName}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Email:</span>
              <span>{userEmail}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
