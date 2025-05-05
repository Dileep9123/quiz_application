import React from "react";
import ideas from "../assets/ideas.png";
import useUserContext from "../context/UserContext";
const Header = () => {
    const {userId, userName, userEmail,isLogin, setUserId, setUserName, setUserEmail, setIsLogin} = useUserContext();
  return (
      <header className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="flex gap-2 text-xl font-bold"> <img src={ideas} className="w-10" /> <span className="mt-1"> QuizMaster </span></div>
        <div className="flex items-center space-x-4">
          <span className="text-lg">{userName}</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>
      </header>

  );
}

export default Header;