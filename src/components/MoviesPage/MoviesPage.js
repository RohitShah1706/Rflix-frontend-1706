import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// IMPORT BACKGROUND IMAGE
import "./MoviesPage.scss";
import DisplayCards from './DisplayCards'
const axios = require('axios');
const MoviesPage = () => {
    const genre = useParams().genre;
    const [genreMovies, setgenreMovies] = useState([]);

    useEffect(() => {
        const url = `${process.env.REACT_APP_GENRE_MOVIES_BASE_URL}${genre}/50`;
        axios.get(url)
            .then(response => {
                setgenreMovies(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <div className="movies-container">
            {/* create responsive row of cards */}
            <Container fluid className="row">
                <DisplayCards list={genreMovies} />
            </Container>

        </div>
    )
}
export default MoviesPage;