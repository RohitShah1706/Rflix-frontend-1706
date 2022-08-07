const axios = require('axios');
const featured_get = async () => {
    return axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then((result) => {
            return result.data;
        })
        .catch((err) => {
            console.log(err);
            return null;
        })
}
export { featured_get };


