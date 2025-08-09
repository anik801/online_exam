import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex space-x-4">
      <Link to="/" className="hover:underline">
        Questionnaire
      </Link>
      <Link to="/examiner" className="hover:underline">
        Examiner
      </Link>
    </nav>
  );
}
