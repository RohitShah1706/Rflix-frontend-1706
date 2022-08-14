const axios = require('axios');
const featured_get = async () => {
    return axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then((result) => {
            // send only those movies that have media type of movie
            const toSend = result.data.results.filter(movie => movie.media_type === 'movie');
            return toSend;
        })
        .catch((err) => {
            console.log(err);
            return null;
        })
}
export { featured_get };


