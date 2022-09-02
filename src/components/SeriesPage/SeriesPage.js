import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// IMPORT BACKGROUND IMAGE
import "./SeriesPage.scss";
import DisplayCards from './DisplayCards'
import { useFetchGenreSeriesQuery } from "../services/backendFetchApi";
const axios = require('axios');
const SeriesPage = () => {
    const genre = useParams().genre;
    const [genreSeries, setgenreSeries] = useState([]);
    const { data, isFetching } = useFetchGenreSeriesQuery(genre);

    useEffect(() => {
        if (!isFetching)
            setgenreSeries(data && data);
    }, [data, isFetching]);
    return (
        <div className="movies-container">
            {/* create responsive row of cards */}
            <Container fluid className="row">
                <DisplayCards list={genreSeries} />
            </Container>
        </div >
    )
}
export default SeriesPage;