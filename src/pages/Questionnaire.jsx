import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadQuestionsFromCSV } from "../utils/csvLoader";

export default function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    loadQuestionsFromCSV(import.meta.env.BASE_URL + "questions.csv").then(setQuestions);
  }, []);

  const handleChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (answers[i] && answers[i] === q.correct) correctCount++;
    });
    setScore(correctCount);

    const existingResults = JSON.parse(localStorage.getItem("results") || "[]");
    existingResults.push({
      name,
      answers,
      score: correctCount,
      total: questions.length,
    });
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  if (score !== null) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Test Complete</h1>
        <p className="mb-4">
          {name}, you scored <strong>{score}</strong> out of {questions.length}.
        </p>
        <Link to="/" className="text-blue-600 hover:underline mr-4">
          Take Again
        </Link>
        <Link to="/examiner" className="text-blue-600 hover:underline">
          Go to Examiner
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Questionnaire</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {questions.map((q, i) => (
          <div key={i} className="border p-4 rounded">
            <p className="font-medium">
              {i + 1}. {q.question}
            </p>
            <div className="mt-2 space-x-4">
              {[q.option1, q.option2].map((opt) => (
                <label key={opt} className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`q${i}`}
                    value={opt}
                    onChange={() => handleChange(i, opt)}
                    checked={answers[i] === opt}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
