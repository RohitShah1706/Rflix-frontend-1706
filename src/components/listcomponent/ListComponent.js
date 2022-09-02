import React from "react";
import { useEffect, useState } from 'react';
import "./ListComponent.scss";
import { Container } from 'react-bootstrap';
import ListCard from "../listcard/ListCard";
import { useFetchTopMoviesQuery } from '../services/backendFetchApi';
import { useFetchTopSeriesQuery } from '../services/backendFetchApi';
import { useFetchInTheatresQuery } from '../services/backendFetchApi';
// USED IMDB API FOR THESE LISTS - UNDER TOP 250 MOVIES ALL TIME

const ListComponent = () => {
    const [topMoviesList, setTopMoviesList] = useState([]);
    const [topTvSeriesList, setTopTvSeriesList] = useState([]);
    const [inTheatres, setInTheatres] = useState([]);
    const { data: topMovies } = useFetchTopMoviesQuery();
    const { data: topSeries } = useFetchTopSeriesQuery();
    const { data: topTheatres } = useFetchInTheatresQuery();

    // getting the first 15 movies and series from the backend server
    useEffect(() => {
        setTopMoviesList(topMovies && topMovies);
        setTopTvSeriesList(topSeries && topSeries);
        setInTheatres(topTheatres && topTheatres);
    }, [topMovies, topSeries, topTheatres]);
    return (
        <Container fluid className="list-wrapper">
            <div className="list">
                <span className="list-title">Top Movies</span>
                <div className="wrapper">
                    <ListCard list={topMoviesList} movie={true} />
                </div>
            </div>
            <div className="list">
                <span className="list-title">Top TV Series</span>
                <div className="wrapper">
                    <ListCard list={topTvSeriesList} movie={false} />
                </div>
            </div>
            <div className="list">
                <span className="list-title">In Theatres</span>
                <div className="wrapper">
                    <ListCard list={inTheatres} movie={true} />
                </div>
            </div>

        </Container>
    );
}
export default ListComponent;