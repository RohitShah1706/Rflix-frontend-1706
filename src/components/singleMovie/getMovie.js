const axios = require('axios');

const getMovie = (url) => {
    return axios.get(url)
        .then((result) => {
            return result.data;
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                return 404;
            }
            return null;
        })
}
module.exports = { getMovie };