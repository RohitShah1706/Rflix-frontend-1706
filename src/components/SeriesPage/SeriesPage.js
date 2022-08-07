<<<<<<< HEAD
import Navigation from "../navbar/Navbar";
=======
>>>>>>> dfdbf44ac957c5df6da93cd98bf74725529e9c0a
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// IMPORT BACKGROUND IMAGE
import "./SeriesPage.scss";
import DisplayCards from './DisplayCards'
const axios = require('axios');
const SeriesPage = () => {
    const genre = useParams().genre;
    const [genreSeries, setgenreSeries] = useState([]);

    useEffect(() => {
        const url = `${process.env.REACT_APP_GENRE_SERIES_BASE_URL}${genre}/50`;
        axios.get(url)
            .then(response => {
                setgenreSeries(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <div className="movies-container">
<<<<<<< HEAD
    <Navigation />
=======
>>>>>>> dfdbf44ac957c5df6da93cd98bf74725529e9c0a
    {/* create responsive row of cards */ }
    <Container fluid className="row">
        <DisplayCards list={genreSeries} />
    </Container>
        </div >
    )
}
export default SeriesPage;