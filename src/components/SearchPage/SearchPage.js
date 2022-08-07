import { Form, Container } from 'react-bootstrap';
import "./SearchPage.scss";
import { useEffect, useState } from 'react';
import DisplayCards from "./DisplayCards";
const { fetch_search } = require('./fetch_search');
const SearchPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [adultContent, setAdultContent] = useState(false);
    const controller = new AbortController();
    // VIMP - CANCEL TOKEN IN AXIOS - 
    const submitForm = (event) => {
        console.log('submitting the form');
        // send the request to the backend server to get the data and console log
        event.preventDefault();
    }
    const handleChange = async (event) => {
        setSearchValue(event.target.value);
    }
    useEffect(() => {
        const { signal } = controller;
        const toSearch = searchValue.split(" ").join("%20");
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${toSearch}&include_adult=${adultContent}`;
        fetch_search(url, signal)
            .then(data => {
                if (data) {
                    setSearchResults(data.results);
                }
            }).catch(err => {
                if (err.name !== "AbortError")
                    console.log(err);

            })
        return () => {
            controller.abort();
        }
    }, [searchValue]);
    return (
        <div className="main-container">
            <Container fluid className="container">
                <Form className="row height d-flex justify-content-center align-items-center" onSubmit={submitForm}>
                    <div className="col-md-6">
                        <div className="form">
                            <input type="text" className="form-control form-input" placeholder="Search movies, series..." onChange={handleChange}></input>
                        </div>
                    </div>
                </Form>
            </Container>
            <Container fluid className="row">
                <DisplayCards list={searchResults} />
            </Container>
        </div>
    )

}
export default SearchPage;