import './App.css';
import HomePage from "./components/HomePage/HomePage";
import Navigation from './components/navbar/Navbar';
import Featured from './components/featured/Featured';
import ListComponent from './components/listcomponent/ListComponent';
import MoviesPage from './components/MoviesPage/MoviesPage.js';
import SeriesPage from './components/SeriesPage/SeriesPage.js';
import FeaturedSingleMovie from "./components/singleMovie/FeaturedSingleMovie.js";
import CardSingleMovie from './components/singleMovie/CardSingleMovie.js';
import CardSingleSeries from "./components/singleMovie/CardSingleSeries.js";
import SearchPage from './components/SearchPage/SearchPage.js';
import MyList from './components/MyList/MyList';
import ContactPage from './components/ContactPage/ContactPage';
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
const allowPiracy = process.env.REACT_APP_ALLOW_PIRACY;
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/featured/:id" element={<FeaturedSingleMovie allowPiracy={allowPiracy} />} />
        <Route exact path="/cardsingle/series/:id" element={<CardSingleSeries allowPiracy={allowPiracy} />} />
        <Route path="/cardsingle/:id" element={<CardSingleMovie allowPiracy={allowPiracy} />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movies/:genre" element={< MoviesPage />} />
        <Route path="/series/:genre" element={<SeriesPage />} />
        {isLoggedIn && <Route path="/mylist" element={<MyList />} />}
        <Route path='/contact' element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}
export default App;
