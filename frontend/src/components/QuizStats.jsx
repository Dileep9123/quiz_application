import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getQuizStats } from '../service/QuizService';
import toast from 'react-hot-toast';
import { getQuizById } from '../service/QuizService';
import { getUserById } from '../service/UserService';

const QuizStatsPage = () => {
  const { quizId } = useParams();
  const [quizStats, setQuizStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [authorName, setAuthorName] = useState("");


  const performFetchQuiz = async () => {
     try {
      const response = await getQuizById(quizId);
      setQuiz(response);
      const author = await getUserById(response.createdUserId);
      setAuthorName(author.name);   
     }
       catch (error) {
          toast.error(error?.response?.data || 'Failed to load quiz details');
          setQuiz(null);
          setAuthorName("")
          console.error(error);
        }
  }

  const performGetQuizStats = async () => {
    try {
      const response = await getQuizStats(quizId);
      console.log(response)
      setQuizStats(response);
    } catch (error) {
        toast.error(error.response.data || 'Failed to load quiz stats');
      console.error( error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
      
    const fetchQuiz = async () => {
        await performFetchQuiz();
    }

    const fetchStats = async () => {
        await performGetQuizStats();
        setLoading(false);
    };
    fetchQuiz();
    fetchStats();
  }, [quizId]);

  if (loading || !quiz) {
    return <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>;
  }

  if (!quizStats) {
    return <div className="text-center mt-10 text-lg text-red-500">Failed to load stats</div>;
  }

  return (
    <>
     {/* Top Bar */}
     <header className="bg-indigo-600 text-white flex justify-between items-center p-4 shadow-md">
        <div>Quiz ID: {quizStats.quizId}</div>
        <div className="text-2xl font-bold">{quiz.title}</div>
        <div>Author: {authorName}</div>
      </header>

    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">Quiz Statistics</h1>

      <div className="text-gray-700 text-center mb-6">
        <p><strong>Total Responses:</strong> {quizStats.totalResponses}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">User ID</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Score</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {quizStats.responses.map((resp, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6">{resp.userId}</td>
                <td className="py-3 px-6">{resp.username}</td>
                <td className="py-3 px-6">{resp.score}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      resp.status === 'passed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {resp.status}
                  </span>
                </td>
              </tr>
            ))}
            {quizStats.responses.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No responses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default QuizStatsPage;
