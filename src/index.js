import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Navigation from './components/navbar/Navbar';
import MoviesPage from './components/MoviesPage/MoviesPage.js';
import SeriesPage from './components/SeriesPage/SeriesPage.js';
import FeaturedSingleMovie from "./components/singleMovie/FeaturedSingleMovie.js";
import CardSingleMovie from './components/singleMovie/CardSingleMovie.js';
import CardSingleSeries from "./components/singleMovie/CardSingleSeries.js";
import SearchPage from './components/SearchPage/SearchPage.js';
import MyList from './components/MyList/MyList';
import ContactPage from './components/ContactPage/ContactPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './components/app/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
const allowPiracy = process.env.REACT_APP_ALLOW_PIRACY;
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/featured/:id" element={<FeaturedSingleMovie allowPiracy={allowPiracy} />} />
        <Route exact path="/cardsingle/series/:id" element={<CardSingleSeries allowPiracy={allowPiracy} />} />
        <Route path="/cardsingle/:id" element={<CardSingleMovie allowPiracy={allowPiracy} />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movies/:genre" element={< MoviesPage />} />
        <Route path="/series/:genre" element={<SeriesPage />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
reportWebVitals();
