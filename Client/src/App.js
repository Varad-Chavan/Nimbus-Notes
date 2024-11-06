import React, {useState } from "react";
import "./Appcss.css";
import { Navbar, Home, About, Mynotes, Login, Alert } from "./components/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";


function App() {
  const [alert, setAlert] = useState(null);

  const writeAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };


  return (
    <>
      <NoteState>
        <Router>
          <Navbar writeAlert={writeAlert} />
          <Alert alert={alert} />
            <Routes>
              <Route path="/" element={<Home writeAlert={writeAlert} />} />
              <Route path="about" element={<About />} />
              <Route path="mynotes" element={<Mynotes writeAlert={writeAlert} />} />
              <Route path="login" element={<Login writeAlert={writeAlert} />} />
              <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
