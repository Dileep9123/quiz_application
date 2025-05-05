import React, { useEffect, useState } from 'react';
import { getSubmissions } from '../service/QuizService';
import toast from 'react-hot-toast';
import useUserContext from '../context/UserContext';
import Header from './Header';

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useUserContext();

  const performGetSubmissions = async () => {
    try {
      const response = await getSubmissions(userId);
      console.log(response); // response is already data
      setSubmissions(response); 
    } catch (error) {
      toast.error(error.response.data || 'Failed to load submissions');
      setSubmissions([]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (userId) {
      performGetSubmissions();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <p className="text-xl font-medium">Loading submissions...</p>
      </div>
    );
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Submissions</h2>

        {submissions.length === 0 ? (
          <p className="text-center text-gray-600">No submissions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-green-100 text-green-900">
                  <th className="py-2 px-4 border">Submitted At</th>
                  <th className="py-2 px-4 border">Quiz ID</th>
                  <th className="py-2 px-4 border">Quiz Title</th>
                  <th className="py-2 px-4 border">Author</th>
                  <th className="py-2 px-4 border">Score</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, index) => (
                  <tr key={index} className="hover:bg-green-50">
                    <td className="py-2 px-4 border text-sm text-gray-700">
                      {new Date(sub.timestamp).toLocaleString('en-IN', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </td>
                    <td className="py-2 px-4 border">{sub.quizId}</td>
                    <td className="py-2 px-4 border">{sub.quizTitle}</td>
                    <td className="py-2 px-4 border">{sub.author}</td>
                    <td className="py-2 px-4 border">{sub.score}</td>
                    <td className={`py-2 px-4 border font-semibold ${sub.status === 'passed' ? 'text-green-600' : 'text-red-600'}`}>
                      {sub.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
