import { Container } from "react-bootstrap";
import DisplayCards from "./DisplayCards";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from '../firebaseAuth/firebaseConfig';
const { getMyList } = require('./getMyList');
const MyList = () => {
    const [userList, setUserList] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        // google logged in check
        const auth = getAuth(app);
        auth.onAuthStateChanged(user => {
            if (user) {
                setUserLoggedIn(true);
                setUserDetails(user);
                getMyList({ user: user })
                    .then(result => {
                        setUserList(result);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                setUserLoggedIn(false);
            }
        });
    }, [userLoggedIn])
    return (
        <Container fluid className="row">
            <DisplayCards list={userList} />
        </Container>
    );
}
export default MyList;