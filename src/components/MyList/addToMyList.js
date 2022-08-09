const axios = require('axios');
const addToMyList = (props) => {
    const url = `${process.env.REACT_APP_USER_SIGN_IN_BASE_URL}addtomylist/`;
    axios.post(url, {
        data: props.user,
        imdbdIdToAdd: props.imdbdIdToAdd
    })
        .then(res => {
            // console.log(res);
        }).catch(err => {
            console.log(err);
        })
}
export { addToMyList };