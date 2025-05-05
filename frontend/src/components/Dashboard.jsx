import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../context/UserContext";
import toast from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";


const Dashboard = () => {
  const navigate = useNavigate();
  const {userId, userName, userEmail,isLogin, setUserId, setUserName, setUserEmail, setIsLogin} = useUserContext();
  // Check if user is logged in, if not redirect to login page  
   
    useEffect(() => {   
        if (!isLogin) {
            toast.error("Please login to access this page.");
            navigate("/");
        }
    }, [isLogin, navigate]);

  const options = [
    { title: "Create Quiz", path: "/create-quiz" },
    { title: "Attempt Quiz", path: "/attempt-quiz" },
    { title: "Created Quizes", path: "/created-quizes" },
    { title: "Submissions", path: "/submissions" },
    { title: "Add Questions", path: "/add-question" },
    { title: "Profile", path: "/profile" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      
      <Header />


      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => navigate(option.path)}
              className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg p-6 text-center text-blue-600 font-semibold text-xl transition-transform transform hover:scale-105"
            >
              {option.title}
            </div>
          ))}
        </div>
      </main>


      <Footer />
    </div>
  );
};

export default Dashboard;
