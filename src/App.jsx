
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Questionnaire from "./pages/Questionnaire";
import Examiner from "./pages/Examiner";

export default function App() {
  return (
    <Router basename="/online_exam/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Questionnaire />} />
        <Route path="/examiner" element={<Examiner />} />
      </Routes>
    </Router>
  );
}




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Questionnaire from "./pages/Questionnaire";
// import Examiner from "./pages/Examiner";

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Questionnaire />} />
//         <Route path="/examiner" element={<Examiner />} />
//       </Routes>
//     </Router>
//   );
// }
