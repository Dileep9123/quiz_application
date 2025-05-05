import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { getQuestionsByAuthor } from "../service/QuestionService";
import { getQuizById } from "../service/QuizService";
import { getUserById } from "../service/UserService";
import { useNavigate } from "react-router-dom";

const QuizDetail = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    async function fetchQuizDetails() {
      try {
        // Fetch quiz details using quiz id
        const quizRes = await getQuizById(id)
        setQuiz(quizRes);

        // Fetch questions
        const questionsRes = await getQuestionsByAuthor(quizRes.questionIds);
        setQuestions(questionsRes);

        // Fetch author
        const author = await getUserById(quizRes.createdUserId);
        setAuthorName(author.name);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load quiz details");
      }
    }

    fetchQuizDetails();
  }, [id]);



  if (!quiz) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <header className="bg-indigo-600 text-white flex justify-between items-center p-4 shadow-md">
        <div>Quiz ID: {quiz.id}</div>
        <div className="text-2xl font-bold">{quiz.title}</div>
        <div>Author: {authorName}</div>
      </header>

      {/* Questions */}
      <main className="flex-grow p-8 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Questions:</h2>
        <div className="grid gap-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                Q{index + 1}: {q.questionTitle}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Option 1:</strong> {q.option1}</p>
                <p><strong>Option 2:</strong> {q.option2}</p>
                <p><strong>Option 3:</strong> {q.option3}</p>
                <p><strong>Option 4:</strong> {q.option4}</p>
                <p><strong>Correct Answer:</strong> {q.rightAnswer}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <button
          onClick={() => navigate('/dashboard')}
          className="w-50 mx-auto my-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Go to Home
        </button>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © {new Date().getFullYear()} Quiz Creator. All rights reserved.
      </footer>
    </div>
  );
};

export default QuizDetail;
