import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "./getMovie";
import { Button } from 'react-bootstrap';
import './SingleMovie.scss';
import { FcPlus } from "react-icons/fc";
import { IoLogoYoutube } from "react-icons/io";
import { getAuth } from "firebase/auth";
import { app } from '../firebaseAuth/firebaseConfig';
import { addToMyList } from "../MyList/addToMyList";
const CardSingleMovie = () => {
    const imdbId = useParams().id;
    const [movie, setMovie] = useState({});
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [youtubeActive, setYoutubeActive] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [imdbdIdToAdd, setimdbdIdToAdd] = useState({
        imdbId: "",
        poster_path: "",
        name: "",
        movie: true
    });
    const getImdbId = (tmdbId) => {
        const url = `https://api.themoviedb.org/3/tv/${tmdbId}/external_ids?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
        getMovie(url)
            .then(result => {
                // set only imdb id of imdbidtoadd
                setimdbdIdToAdd(prevState => {
                    return { ...prevState, imdbId: result.imdb_id, movie: false, name: movie.original_title || movie.original_name }
                })
            })
    }
    const postToMyList = () => {
        alert(`${(movie.original_title || movie.original_name).toUpperCase()} added to your list.`);
        addToMyList({ user: userDetails, imdbdIdToAdd: imdbdIdToAdd });
    }

    useEffect(() => {
        var url = `https://api.themoviedb.org/3/movie/${imdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
        getMovie(url)
            .then(result => {
                if (result === 404) {
                    // ! you'll get 404 if if you try tv search via movie imdb id
                    url = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&external_source=imdb_id`
                    // take this url and get the name for the series
                    getMovie(url)
                        .then(getSeriesName => {
                            // ! length = 0 when you try to search tv series via imdb id - so after we search using tmdb id
                            // so you call getimdb id function to get the imdb id of the series
                            if (getSeriesName.tv_results.length === 0) {
                                url = `https://api.themoviedb.org/3/tv/${imdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
                                getMovie(url)
                                    .then(getSeriesReponse => {
                                        setMovie(getSeriesReponse);
                                        getImdbId(getSeriesReponse.id);
                                        // then set the object to be sent
                                        setimdbdIdToAdd(prevState => {
                                            return { ...prevState, movie: false, name: getSeriesReponse.original_name || getSeriesReponse.original_title || getSeriesReponse.name, poster_path: getSeriesReponse.poster_path }
                                        })
                                        getSeriesName = getSeriesReponse.name;
                                        const name = getSeriesName.split(" ").join("%20");
                                        url = `${process.env.REACT_APP_SERIES_YOUTUBE_TRAILER_URL}${name}`
                                        getMovie(url)
                                            .then(result => {
                                                setYoutubeUrl(result.embedlink);
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
                                    })
                            }
                            else {
                                setMovie(getSeriesName.tv_results[0]);
                                // now we've name - make request to backend to get the embedded youtube link
                                // split name and join using %20
                                getSeriesName = getSeriesName.tv_results[0];
                                setimdbdIdToAdd(prevState => {
                                    return { ...prevState, poster_path: getSeriesName.poster_path, movie: false, name: getSeriesName.name || getSeriesName.original_name || getSeriesName.original_title }
                                })
                                getImdbId(getSeriesName.id);
                                const name = getSeriesName.name.split(" ").join("%20");
                                url = `${process.env.REACT_APP_SERIES_YOUTUBE_TRAILER_URL}${name}`
                                getMovie(url)
                                    .then(result => {
                                        setYoutubeUrl(result.embedlink);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
                else {
                    setMovie(result);
                    setimdbdIdToAdd({
                        imdbId: result.imdb_id,
                        poster_path: result.poster_path,
                        movie: true,
                        name: result.original_title || result.original_name

                    });
                    url = `${process.env.REACT_APP_YOUTUBE_TRAILER_BASE_URL}${result.imdb_id}`
                    getMovie(url)
                        .then(result => {
                            setYoutubeUrl(result.embedlink);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // google logged in check
        const auth = getAuth(app);
        auth.onAuthStateChanged(user => {
            if (user) {
                setUserLoggedIn(true);
                setUserDetails(user);
            } else {
                setUserLoggedIn(false);
            }
        });
    }, [userLoggedIn])
    const unhideYoutube = () => {
        setYoutubeActive(!youtubeActive);
    }
    return (
        <>
            <div className="item-page">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt=""
                    className="item-page__bg"
                />
                <div className="item">
                    <div className="item__outer">
                        <div className="item__inner">
                            <div className="item__img-box">
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster" className="item__poster-img" />
                            </div>
                            <div className="item__text-box">
                                <h1 className="item__title">{movie.original_title || movie.original_name}</h1>
                                <span className="item__overview">{movie.overview}</span>
                                <div className="item__overview">
                                    {userLoggedIn ? <Button variant="outline-dark" className='button'><FcPlus style={{ fontSize: "3.2em" }} onClick={postToMyList} /></Button> :
                                        ""}
                                    <Button variant="outline-dark" className='button' onClick={unhideYoutube}><IoLogoYoutube style={{ color: "red", fontSize: "3.2em" }} /></Button>
                                </div>
                                {/* EMBEDDED YOUTUBE PLAYER */}
                                <div className="video-container">
                                    {youtubeActive ? <iframe width="560" height="315" src={youtubeUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="youtube-player"></iframe> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CardSingleMovie;