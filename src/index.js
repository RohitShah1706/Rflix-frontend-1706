import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Navigation from './components/navbar/Navbar';
import MoviesPage from './components/MoviesPage/MoviesPage.js';
import SeriesPage from './components/SeriesPage/SeriesPage.js';
import FeaturedSingleMovie from "./components/singleMovie/FeaturedSingleMovie.js";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/featured/:id" element={<FeaturedSingleMovie />} />
      <Route path="/movies/:genre" element={< MoviesPage />} />
      <Route path="/series/:genre" element={<SeriesPage />} />
      <Route path="/invoices" element={<App />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
