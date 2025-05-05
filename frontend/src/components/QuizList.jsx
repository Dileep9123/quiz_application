import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../context/UserContext';
import toast from 'react-hot-toast';
import { getQuizzesByUserId } from '../service/QuizService';
import Footer from './Footer';
import Header from './Header';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const {userId, userName, userEmail,isLogin, setUserId, setUserName, setUserEmail, setIsLogin} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {   
    if (!isLogin) {
        toast.error("Please login to access this page.");
        navigate("/");
    }
}, [isLogin, navigate]);

  const performGetQuizzesByUserId = async () => {
    try {
        const response = await getQuizzesByUserId(userId);
        setQuizzes(response);
        }
        catch(error) {
            toast.error(error.response.data);
            setQuizzes([]);
        }
    }   

  useEffect(() => {
    const fetchQuizzes = async () => {
     await performGetQuizzesByUserId();
    };

     fetchQuizzes();

  }, [userId]);

  const handleShowDetails = (id) => {
    navigate(`/quiz/${id}`);
  };

  const handleShowStats = (id) => {
    navigate(`/quiz-stats/${id}`);
  };

 return (
  <div className="min-h-screen">
  <Header />
  <div className="max-w-4xl mx-auto p-6 mt-10 min-h-[60vh]">
    <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">Your Created Quizzes</h1>

    {quizzes.length === 0 ? (
      <div className="flex justify-center items-center h-64 text-gray-500 text-xl font-medium">
        No quizzes are created by you.
      </div>
    ) : (
      <div className="space-y-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <p className="text-gray-600 text-sm">Quiz ID: {quiz.id}</p>
              <h2 className="text-xl font-semibold text-indigo-700">{quiz.title}</h2>
            </div>

            <div className="space-x-4">
              <button
                onClick={() => handleShowDetails(quiz.id)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg transition"
              >
                Show Quiz Details
              </button>
              <button
                onClick={() => handleShowStats(quiz.id)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg transition"
              >
                Show Stats
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
 
  </div>
);

};

export default QuizList;
