import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Navigation from './components/navbar/Navbar';
import FeaturedSingleMovie from "./components/singleMovie/FeaturedSingleMovie.js";
import CardSingleMovie from './components/singleMovie/CardSingleMovie.js';
import CardSingleSeries from "./components/singleMovie/CardSingleSeries.js";
import SearchPage from './components/SearchPage/SearchPage.js';
import MoviesPage from './components/MoviesPage/MoviesPage.js';
import SeriesPage from './components/SeriesPage/SeriesPage.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/featured/:id" element={<FeaturedSingleMovie />} />
      <Route exact path="/cardsingle/series/:id" element={<CardSingleSeries />} />
      <Route path="/cardsingle/:id" element={<CardSingleMovie />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/movies/:genre" element={<MoviesPage />} />
      <Route path="/series/:genre" element={<SeriesPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
