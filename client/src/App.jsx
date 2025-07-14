import React from "react";
import About from "./components/About";
import Editor from "./components/Editor";
import Navbar from "./components/Navbar";
import LoginPage from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home"; // ✅ Added Home import

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/write"
          element={
            <PrivateRoute>
              <Editor />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
