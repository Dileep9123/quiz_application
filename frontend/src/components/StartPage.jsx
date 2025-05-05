// src/pages/StartPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartPage() {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quizId.trim()) {
      navigate(`/attempt/${quizId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Enter Quiz ID</h2>
        <input 
          type="text"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          placeholder="Quiz ID"
          className="w-full border border-gray-300 p-2 rounded-lg mb-4"
        />
        <button 
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
}
