import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
function App() {
  const [alert, setalert] = useState(null);
  function showAlert(message, type) {
    setalert({ msg: message, type });
    setTimeout(() => {
      setalert(null);
    }, 3000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
              path="/login"
              element={<Login showAlert={showAlert} />}
            ></Route>
            <Route
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            ></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
