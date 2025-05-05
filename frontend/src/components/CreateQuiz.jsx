import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../context/UserContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { createQuiz } from '../service/QuizService';
import Header from './Header';
import Footer from './Footer';

const CreateQuiz = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    numQuestions: '',
  });
   const {userId, userName, userEmail,isLogin, setUserId, setUserName, setUserEmail, setIsLogin} = useUserContext();
    const navigate = useNavigate();

   useEffect(() => {   
    if (!isLogin) {
        toast.error("Please login to access this page.");
        navigate("/");
    }
}, [isLogin, navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const performCreateQuiz = async (quizDetails) => {
    try {
            const response = await createQuiz(quizDetails);
            console.log(response);
            toast.success("Quiz created successfully!");
            navigate(`/quiz/${response.id}`);
        }
        catch(error) {
            toast.error(error.response.data);
        }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      title: formData.title,
      createdUserId: userId,
      category: formData.category,
      numQuestions: Number(formData.numQuestions)
    };

    if (!quizData.title || !quizData.category || !quizData.numQuestions) {
      toast.error("Please fill all fields");
      return;
    }

    if (quizData.numQuestions < 1) {
      toast.error("Number of questions must be at least 1");
      return;
    }
    
    performCreateQuiz(quizData);
  };

  return (
    <>
    <Header />
    <div className="max-w-2xl mx-auto p-8 my-11 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Create a New Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
       

        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Quiz Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select Category</option>
            <option value="java">Java</option>
            <option value="math">Math</option>
            <option value="python">Python</option>
            <option value="dbms">DBMS</option>
            <option value="os">OS</option>
            <option value="dccn">DCCN</option>
          </select>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Number of Questions</label>
          <input
            type="number"
            name="numQuestions"
            value={formData.numQuestions}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            min="1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
        >
          Create Quiz
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default CreateQuiz;
