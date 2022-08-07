import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "./getMovie";
import { Button } from 'react-bootstrap';
import './SingleMovie.scss';
import { FcPlus } from "react-icons/fc";
import { IoLogoYoutube } from "react-icons/io";
const FeaturedSingleMovie = () => {
    const tmdbId = useParams().id;
    const [movie, setMovie] = useState({});
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [youtubeActive, setYoutubeActive] = useState(false);

    useEffect(() => {
        var url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
        getMovie(url)
            .then(result => {
                if (result === 404) {
                    url = `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
                    // take this url and get the name for the series
                    getMovie(url)
                        .then(getSeriesName => {
                            setMovie(getSeriesName);
                            console.log(url, getSeriesName);
                            // now we've name - make request to backend to get the embedded youtube link
                            // split name and join using %20
                            const name = getSeriesName.name.split(" ").join("%20");
                            url = `${process.env.REACT_APP_SERIES_YOUTUBE_TRAILER_URL}${name}`
                            getMovie(url)
                                .then(result => {
                                    setYoutubeUrl(result.embedlink);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
                else {
                    setMovie(result);
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
                                    <Button variant="outline-dark" className='button'><FcPlus style={{ fontSize: "3.2em" }} /></Button>
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
export default FeaturedSingleMovie;
