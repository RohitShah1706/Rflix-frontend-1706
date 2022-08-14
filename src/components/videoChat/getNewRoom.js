const axios = require('axios');
const getNewRoom = () => {
    return axios.get(`${process.env.REACT_APP_GET_NEW_MEETING_ROOM_BASE_URL}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}
module.exports = { getNewRoom };