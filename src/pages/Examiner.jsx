// src/pages/Examiner.jsx
import React, { useState } from "react";
import ExaminerAuth from "../utils/ExaminerAuth";
import ExaminerView from "./ExaminerView";

export default function Examiner() {
  const [authenticated, setAuthenticated] = useState(false);

  return authenticated ? (
    <ExaminerView />
  ) : (
    <ExaminerAuth onAuthSuccess={() => setAuthenticated(true)} />
  );
}
