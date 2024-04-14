
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import HomePage from "./Components/HomePage/index.jsx";
import FilmPage from "./Components/FilmPage/index.jsx";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/meet/:id" element={<FilmPage />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
