import React from "react";
import { useEffect, useState } from 'react';
import "./ListComponent.scss";
import { Container } from 'react-bootstrap';
import ListCard from "../listcard/ListCard";
// USED IMDB API FOR THESE LISTS - UNDER TOP 250 MOVIES ALL TIME
const axios = require('axios');

const fetchData = (base_url) => {
    return axios.get(base_url)
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return null;
        })
}

const ListComponent = () => {
    const [topMoviesList, setTopMoviesList] = useState([]);
    const [topTvSeriesList, setTopTvSeriesList] = useState([]);
    const [inTheatres, setInTheatres] = useState([]);

    // getting the first 15 movies and series from the backend server
    useEffect(() => {
        fetchData(`${process.env.REACT_APP_IMDB_API_MOVIES_BASE_URL}/15`)
            .then((result) => {
                setTopMoviesList(result);
            })
            .catch((err) => {
                console.log(err);
                return null;
            })
        fetchData(`${process.env.REACT_APP_IMDB_API_SERIES_BASE_URL}/15`)
            .then((result) => {
                setTopTvSeriesList(result);
            })
            .catch((err) => {
                console.log(err);
                return null;
            })
        fetchData(`${process.env.REACT_APP_IMDB_API_IN_THEATRES_BASE_URL}/15`)
            .then((result) => {
                setInTheatres(result);
            })
            .catch((err) => {
                console.log(err);
                return null;
            })
    }, []);
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