// src/pages/AttemptQuiz.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getQuizQuestions } from '../service/QuizService';
import useUserContext from '../context/UserContext';
import { getQuizById } from '../service/QuizService';
import { getUserById } from '../service/UserService';
import { getQuizResult } from '../service/QuizService';


export default function AttemptQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const {userId, userName, userEmail,isLogin, setUserId, setUserName, setUserEmail, setIsLogin} = useUserContext();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // e.g. { questionId: selectedOption }
  const [quiz, setQuiz] = useState(null); // e.g. { id: 1, title: "Quiz 1", questions: [...] }
  const [authorName, setAuthorName] = useState("");

  if (!isLogin) {
    toast.error("Please login to access this page.");
    navigate("/");
  }

  const performFetchQuestions = async () => {
    try {
      const response = await getQuizQuestions(quizId);
      
      const formattedQuestions = response.map(q => ({
        id: q.id,
        text: q.questionTitle,
        options: [
          { label: q.option1, value: q.option1 },
          { label: q.option2, value: q.option2 },
          { label: q.option3, value: q.option3 },
          { label: q.option4, value: q.option4 },
        ]
      }));
  
      setQuestions(formattedQuestions);
    } catch (error) {
      toast.error(error?.response?.data || 'Failed to load questions');
      setQuestions([]);
      console.error(error);
      navigate("/attempt-quiz");
    }
  };
  

  const performFetchQuiz = async () => {
    try {
      const response = await getQuizById(quizId);
      setQuiz(response);
    } catch (error) {
      toast.error(error.response.data);
      setQuiz(null);
      console.error(error);
      navigate("/attempt-quiz");
    }
  }
  
  const performFetchAuthor = async () => {
    try {
      const response = await getUserById(quiz.createdUserId);
      setAuthorName(response.name);
    } catch (error) {
      toast.error(error.response.data);
      setAuthorName("");
      console.error(error);
      navigate("/attempt-quiz");
    }
  }

  const performSubmitQuiz = async (responses) => {
    try {
      console.log(responses);
      const response = await getQuizResult(quizId, userId, responses);
      toast.success("Quiz submitted successfully!");
      navigate(`/result`, { state: { score: response, total: questions.length } });
    } catch (error) {
      toast.error(error.response.data);
      console.error(error);
    }
  }

  useEffect( () => {
    // Fetch quiz data from backend (without answers)
    const fetchQuiz= async () => {
        await performFetchQuiz();
    };
    const fetchQuestions = async () => {
        await performFetchQuestions();
    };

  

    fetchQuiz();
    fetchQuestions();

  }, [quizId]);

  useEffect(() => {
   const fetchAuthor = async () => {
       await performFetchAuthor();
   }
   if(quiz)
   fetchAuthor();
  }, [quiz]);   



  const handleOptionChange = (questionId, optionValue) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionValue }));
  };

  const clearSelection = (questionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: '' }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    // Prepare response objects
    const responses = questions.map(q => ({
      quizId : quiz.id,
      questionId: q.id,
      userId  : userId, 
      response: answers[q.id] || ''  // send empty if none selected
    }));


    // Perform submit
    await performSubmitQuiz(responses);

    
  };



  if (questions.length === 0) {
    return <p className="text-center mt-10">Loading quiz...</p>;
  }

  return (
    <>
    {/* Top Bar */}
    <header className="bg-indigo-600 text-white flex justify-between items-center p-4 shadow-md">
        <div>Quiz ID: {quiz.id}</div>
        <div className="text-2xl font-bold">{quiz.title}</div>
        <div>Author: {authorName}</div>
      </header>
    <div className="min-h-screen bg-gray-50 p-6">
      
      <div className="space-y-8">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-lg shadow-md p-4">
            <p className="font-medium mb-4">{idx+1}. {q.text}</p>
            <div className="space-y-2">
              {q.options.map(opt => (
                <label key={opt.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt.value}
                    checked={answers[q.id] === opt.value}
                    onChange={() => handleOptionChange(q.id, opt.value)}
                    className="form-radio text-blue-600"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            <button
              onClick={() => clearSelection(q.id)}
              className="mt-3 text-sm text-red-500 hover:underline"
            >
              Clear Selection
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button 
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Submit Quiz
        </button>
      </div>
    </div>
    </>
  );
}
