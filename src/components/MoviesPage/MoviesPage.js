import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// IMPORT BACKGROUND IMAGE
import "./MoviesPage.scss";
import DisplayCards from './DisplayCards'
import { useFetchGenreMoviesQuery } from '../services/backendFetchApi';
const MoviesPage = () => {
    const genre = useParams().genre;
    const { data, isFetching } = useFetchGenreMoviesQuery(genre);
    const [genreMovies, setgenreMovies] = useState([]);

    useEffect(() => {
        setgenreMovies(data && data);
    }, [data, genre]);
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