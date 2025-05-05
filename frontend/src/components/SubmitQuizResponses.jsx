// Inside AttemptQuiz component (handleSubmit)
const responses = quiz.questions.map(q => ({
    quizId,
    questionId: q.id,
    userId,
    responseValue: answers[q.id] || ""
  }));
  
  try {
    const res = await fetch('/api/quizzes/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(responses)
    });
    if (!res.ok) throw new Error();
    const result = await res.json();  // e.g. { score: 8, total: 10 }
    toast.success("Quiz submitted!");
    // Navigate to Result page, passing score via location state
    navigate('/result', { state: { score: result.score, total: result.total } });
  } catch (err) {
    toast.error("Submission failed.");
  }
  