import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "./getMovie";
import { getNewRoom } from "../videoChat/getNewRoom";
import { Button, Form } from 'react-bootstrap';
import './SingleMovie.scss';
import { FcPlus } from "react-icons/fc";
import { IoLogoYoutube } from "react-icons/io";
import { BsCameraVideo } from "react-icons/bs";
import { FcClapperboard } from "react-icons/fc";
import { getAuth } from "firebase/auth";
import { app } from '../firebaseAuth/firebaseConfig';
import { addToMyList } from "../MyList/addToMyList";
import axios from "axios";
const CardSingleSeries = (props) => {
    const imdbId = useParams().id;
    const [movie, setMovie] = useState({});
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [youtubeActive, setYoutubeActive] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [imdbdIdToAdd, setimdbIdToAdd] = useState({
        imdbId: "",
        poster_path: "",
        name: "",
        movie: true
    });
    const [toWatchSeries, setToWatchSeries] = useState({
        season_number: "1",
        episode: "1"
    });
    const [seriesDetails, setSeriesDetails] = useState({
        seasons: [],
        episodes: []
    });
    const [movieEmbedActive, setMovieEmbedActive] = useState(false);
    const [seriesEmbedUrl, setSeriesEmbedUrl] = useState("");
    const [meetingRoomUrl, setMeetingRoomUrl] = useState("");

    const getImdbId = (tmdbId) => {
        const url = `${process.env.REACT_APP_SEARCH_TMDB_SERIES_BASE_URL}${tmdbId}/external_ids?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
        getMovie(url)
            .then(result => {
                // set only imdb id of imdbidtoadd
                setimdbIdToAdd(prevState => {
                    return { ...prevState, imdbId: imdbId, movie: false, name: movie.original_title || movie.original_name || movie.name }
                })
            })
    }

    const postToMyList = () => {
        alert(`${(movie.original_title || movie.original_name).toUpperCase()} added to my list !!! with imdbId ${imdbdIdToAdd.imdbId} and type ${imdbdIdToAdd.movie ? "movie" : "tv"}`);
        addToMyList({ user: userDetails, imdbdIdToAdd: imdbdIdToAdd });
    }
    const assignNewRoom = () => {
        getNewRoom()
            .then(result => {
                setMeetingRoomUrl(result.url);
                // open this url in a new tab
                window.open(result.url);
            })
    }
    const getEpisodesDetails = (season_number) => {
        const episodeUrl = `${process.env.REACT_APP_SEARCH_TMDB_SERIES_BASE_URL}${imdbId}/season/${season_number}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
        axios.get(episodeUrl)
            .then(response => {
                setSeriesDetails(prevState => {
                    return { ...prevState, episodes: response.data.episodes }
                })
                setToWatchSeries(prevState => {
                    return { ...prevState, season_number: season_number, episode: "1" }
                })
            })
    }
    const getSeriesDetailsDefault = () => {
        setYoutubeActive(false);
        if (!movieEmbedActive) {
            // get the details for the no. of seasons and also set total episodes
            const seasonUrl = `${process.env.REACT_APP_SEARCH_TMDB_SERIES_BASE_URL}${imdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
            axios.get(seasonUrl)
                .then(response => {
                    // setting the seasons and the episodes for the first season
                    getEpisodesDetails("1");
                    setToWatchSeries(prevState => {
                        return { ...prevState, season_number: "1" }
                    })
                    setSeriesDetails(prevState => {
                        return { ...prevState, seasons: response.data.seasons }
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
        setMovieEmbedActive(!movieEmbedActive);
    }
    const selectValueSet = (event) => {
        // here we will set the episode name and the episode number
        if (event.target.name === "season_number") {
            getEpisodesDetails(event.target.value);
        }
        setToWatchSeries(prevState => {
            return { ...prevState, [event.target.name]: event.target.value }
        })
    }
    const getSeriesEmbedUrl = () => {
        // example = https://novastream.to/embed/series?imdb=tt4574334&sea=4&epi=3
        // example = https://novastream.to/embed/series?imdb=tt4574334&amp;sea=2&amp;epi=5
        if (imdbId.substring(0, 2) === "tt") {
            const url = `${process.env.REACT_APP_GET_SERIES_EMBED_URL}${imdbId}&sea=${toWatchSeries.season_number}&epi=${toWatchSeries.episode}`;
        }
        else {
            // fetch the imdbId first
            const url = `${process.env.REACT_APP_SEARCH_TMDB_SERIES_BASE_URL}${imdbId}/season/${toWatchSeries.season_number}/episode/${toWatchSeries.episode}/external_ids?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
            axios(url)
                .then(response => {
                    const embedUrl = `${process.env.REACT_APP_GET_SERIES_EMBED_URL}${response.data.imdb_id}`;
                    setSeriesEmbedUrl(embedUrl);
                    // document.getElementById('div_iframe').scrollTop = 438
                })
        }
    }

    useEffect(() => {
        // on changing toWatchSeries here we get the embed url for the series and display it in the video player
        getSeriesEmbedUrl();
    }, [toWatchSeries])


    const displaySeasonsSelect = () => {
        return seriesDetails.seasons.map((season, index) => {
            return <option key={index} value={`${season.season_number}`}>{season.name}</option>
        })
    }
    const displayEpisodesSelect = () => {
        return seriesDetails.episodes.map((episode, index) => {
            return <option key={index} value={`${episode.episode_number}`}>{episode.name}</option>
        })
    }

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

    useEffect(() => {
        var url = `${process.env.REACT_APP_SEARCH_TMDB_SERIES_CARD_SINGLE_BASE_URL}${imdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&external_source=imdb_id`
        // take this url and get the name for the series
        getMovie(url)
            .then(getSeriesName => {
                if (getSeriesName.tv_results.length === 0) {
                    url = `${process.env.REACT_APP_SEARCH_TMDB_SERIES_BASE_URL}${imdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
                    getMovie(url)
                        .then(getSeriesReponse => {
                            setMovie(getSeriesReponse);
                            getImdbId(getSeriesReponse.id);
                            // then set the object to be sent
                            setimdbIdToAdd(prevState => {
                                return { ...prevState, movie: false, name: getSeriesReponse.original_name || getSeriesReponse.original_title || getSeriesReponse.name, poster_path: getSeriesReponse.poster_path }
                            })
                            getSeriesName = getSeriesReponse.name;
                            const name = getSeriesName.split(" ").join("%20");
                            url = `${process.env.REACT_APP_SERIES_YOUTUBE_TRAILER_URL}${imdbId}`
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
                    setimdbIdToAdd(prevState => {
                        return { ...prevState, poster_path: getSeriesName.poster_path, movie: false, name: getSeriesName.name || getSeriesName.original_name || getSeriesName.original_title }
                    })
                    getImdbId(getSeriesName.id);
                    const name = getSeriesName.name.split(" ").join("%20");
                    url = `${process.env.REACT_APP_SERIES_YOUTUBE_TRAILER_URL}${imdbId}`
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
    }, []);


    const unhideYoutube = () => {
        setMovieEmbedActive(false);
        setYoutubeActive(!youtubeActive);
    }
    return (
        <>
            <div className="item-page">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={`Card image for ${movie.name || movie.title}`}
                    className="item-page__bg"
                />
                <div className="item">
                    <div className="item__outer">
                        <div className="item__inner">
                            <div className="item__img-box">
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`Card image for ${movie.name || movie.title}`} className="item__poster-img" />
                            </div>
                            <div className="item__text-box">
                                <h1 className="item__title">{movie.original_title || movie.original_name}</h1>
                                <span className="item__overview">{movie.overview}</span>
                                <div className="item__overview">
                                    {userLoggedIn ? <Button variant="outline-dark" className='button'><FcPlus style={{ fontSize: "3.2em" }} onClick={postToMyList} /></Button> :
                                        ""}
                                    <Button variant="outline-dark" className='button' onClick={unhideYoutube}><IoLogoYoutube style={{ color: "red", fontSize: "3.2em" }} /></Button>
                                    {userLoggedIn ? <Button variant="outline-light" className='button'><BsCameraVideo style={{ fontSize: "3.2em" }} onClick={assignNewRoom} /></Button> :
                                        ""}
                                    {props.allowPiracy ?
                                        <Button variant="outline-dark" className='button'><FcClapperboard style={{ color: "red", fontSize: "3.2em" }} onClick={getSeriesDetailsDefault} /></Button>
                                        : ""}
                                </div>
                                {/* SELECT BOX IF PIRACY && MOVIEEMBEDACTIVE = TRUE */}
                                {props.allowPiracy && movieEmbedActive ?
                                    <div className="item__select-box">
                                        <Form.Select aria-label="Select Season" name="season_number" onChange={selectValueSet}>
                                            {displaySeasonsSelect()}
                                        </Form.Select>
                                        <Form.Select aria-label="Select Episode" name="episode" onChange={selectValueSet}>
                                            {displayEpisodesSelect()}
                                        </Form.Select>
                                    </div>
                                    : ""}
                                {/* EMBEDDED YOUTUBE AND SERIES PLAYER */}
                                <div className="video-container">
                                    {youtubeActive ? <iframe width="560" height="315" src={youtubeUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="youtube-player"></iframe> : ""}
                                    {movieEmbedActive ? <iframe width="560" height="315" src={seriesEmbedUrl} title="" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="youtube-player" id="div_iframe" scrolling="no"></iframe> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CardSingleSeries;