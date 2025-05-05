import React from "react";
import App from "../App";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import AddQuestion from "../components/AddQuestion";
import CreateQuiz from "../components/CreateQuiz";
import QuizDetails from "../components/QuizDetails";
import QuizList from "../components/QuizList";
import AttemptQuiz from "../components/AttemptQuiz";
import ResultPage from "../components/ResultPage";
import StartPage from "../components/StartPage";
import QuizStats from "../components/QuizStats";
import Submissions from "../components/submissons";
import Profile from "../components/Profile";

const AppRoutes = () => {
  return (
     <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
         
      
        <Route path="/attempt/:quizId" element={<AttemptQuiz />} />
        <Route path="/result" element={<ResultPage />} />
         <Route path="/attempt-quiz" element={<StartPage />} />
         <Route path="/quiz-stats/:quizId" element={<QuizStats />} />


         <Route path="/created-quizes" element={<QuizList />} />
         <Route path="/submissions" element={<Submissions />} />
         <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/profile" element={<Profile />} />
     </Routes>
  );
}

export default AppRoutes;