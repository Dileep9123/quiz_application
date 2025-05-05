import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
        <p className="text-xl mb-6">
          Your Score: <span className="font-semibold">{score}</span> / {total}
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
