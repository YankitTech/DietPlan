import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/Dashboard";
import CreateStudy from "./components/study/CreateStudy";
import Subject from "./components/subject/Subjects";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [studies, setStudies] = useState(() => {
    const saved = localStorage.getItem("studies");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("studies", JSON.stringify(studies));
  }, [studies]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard studies={studies} />} />
        <Route
          path="/subject"
          element={<Subject studies={studies} setStudies={setStudies} />}
        />
        <Route
          path="/createstudy"
          element={<CreateStudy studies={studies} setStudies={setStudies} />}
        />
      </Routes>
    </div>
  );
}

export default App;
