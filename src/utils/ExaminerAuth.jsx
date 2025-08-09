// src/components/ExaminerAuth.jsx
import React, { useState } from "react";

export default function ExaminerAuth({ onAuthSuccess }) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "112233") {
      onAuthSuccess();
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto mt-10 border rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Examiner Login</h1>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </div>
  );
}
