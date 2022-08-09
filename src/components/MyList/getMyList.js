const axios = require('axios');
const getMyList = (props) => {
    // props will have userId to extract the list from the backend database.
    const url = `${process.env.REACT_APP_USER_SIGN_IN_BASE_URL}`;
    return axios.post(url, {
        data: props.user,
    })
        .then(result => {
            return result.data;
        })
        .catch(err => {
            console.log(err);
            return [];
        })
}
export { getMyList };