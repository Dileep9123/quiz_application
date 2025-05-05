import React, { useState } from "react";
import { addQuestion } from "../service/QuestionService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useUserContext from "../context/UserContext";
import { useEffect } from "react";

const AddQuestion = () => {
    const { isLogin } = useUserContext();
    const navigate = useNavigate();
 

       useEffect(() => {   
            if (!isLogin) {
                toast.error("Please login to access this page.");
                navigate("/");
            }
        }, [isLogin, navigate]);

   const [formData, setFormData] = useState({
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightAnswer: "",
    difficultyLevel: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const performAddQuestion = async (question) => {
     
       try {
         const response = await addQuestion(question);
         console.log(response);
         toast.success("Question added successfully!");
         navigate("/dashboard");
        
       }
       catch (error) {
         toast.error(error.response.data);
       }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { questionTitle, option1, option2, option3, option4, rightAnswer, difficultyLevel, category } = formData;
    if (!questionTitle || !option1 || !option2 || !option3 || !option4 || !rightAnswer || !difficultyLevel || !category) {
      toast.error("Please fill all fields");
      return;
    }

    if(rightAnswer !== option1 && rightAnswer !== option2 && rightAnswer !== option3 && rightAnswer !== option4) {
      toast.error("Correct answer must be one of the options");
      return;
    }

    performAddQuestion({
        questionTitle: questionTitle,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        rightAnswer: rightAnswer,
        difficultyLevel: difficultyLevel,
        category: category
    });

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-800">
          Add New Question
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="questionTitle"
            placeholder="Question Title"
            value={formData.questionTitle}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          {[1, 2, 3, 4].map((num) => (
            <input
              key={num}
              type="text"
              name={`option${num}`}
              placeholder={`Option ${num}`}
              value={formData[`option${num}`]}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          ))}

          <input
            type="text"
            name="rightAnswer"
            placeholder="Correct Answer"
            value={formData.rightAnswer}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <select
            name="difficultyLevel"
            value={formData.difficultyLevel}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Difficulty Level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

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

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 font-semibold"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
