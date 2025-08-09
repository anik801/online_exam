// src/components/ExaminerView.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ExaminerView() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("results") || "[]");
    setResults(stored);
  }, []);

  const totalParticipants = results.length;
  const avgScore =
    totalParticipants > 0
      ? (results.reduce((acc, r) => acc + r.score, 0) / totalParticipants).toFixed(2)
      : 0;

  const downloadCSV = () => {
    if (results.length === 0) {
      alert("No results to download");
      return;
    }

    let csvContent = "Name,Score,Total,Answers\n";
    results.forEach((r) => {
      const answersStr = Object.values(r.answers).join("|");
      csvContent += `${r.name},${r.score},${r.total},"${answersStr}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearResults = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all results? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("results");
      setResults([]);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Examiner</h1>
      <div className="mb-4">
        <p>Total Participants: {totalParticipants}</p>
        <p>Average Score: {avgScore}</p>
      </div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={downloadCSV}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Results as CSV
        </button>
        <button
          onClick={clearResults}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Clear Results
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Answers</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={idx}>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">
                {r.score}/{r.total}
              </td>
              <td className="border p-2">
                {Object.values(r.answers).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
        Back to Questionnaire
      </Link>
    </div>
  );
}
