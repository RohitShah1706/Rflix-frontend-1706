import React, { useEffect } from 'react';
import { Navbar, Nav, Button, Container, NavDropdown, NavLink } from 'react-bootstrap';
import './Navbar.scss';
import { FaSearch } from 'react-icons/fa';
import { MdNotificationsNone } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dropdownitemsMovies, dropdownitemSeries } from "./dropdown-items";
import logo from '../../assets/images/logo.png';
import { fireBaseLogout } from '../firebaseAuth/fireBaseLogout';
import { fireBaseSignIn } from '../firebaseAuth/fireBaseSignIn';
import { getAuth } from "firebase/auth";
import { app } from '../firebaseAuth/firebaseConfig';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../app/authSlice';
const axios = require('axios');
const sendSignInDetails = (user) => {
    axios.post(`${process.env.REACT_APP_USER_SIGN_IN_BASE_URL}signin/`, {
        data: user
    })
        .then(res => {
            // console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}
function Navigation() {
    // const [userLoggedIn, setUserLoggedIn] = useState(false);
    const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userDetails = JSON.parse(useSelector((state) => state.auth.user));
    const dispatch = useDispatch();
    // const [userDetails, setUserDetails] = useState({});
    const [showDropdown, setShowDropdown] = useState("");
    const [dropDownItems, setDropDownItems] = useState([]);

    const DisplayDropdown = () => {
        // iterate through dropdown items and display
        return dropDownItems.map((item, index) => {
            return (
                <NavDropdown.Item href={`${showDropdown}/${item.id}`} key={index}>{item.name}</NavDropdown.Item >
            )
        })
    }

    const signInWithFirebase = () => {
        // sign in with firebase
        fireBaseSignIn()
            .then(user => {
                if (user) {
                    sendSignInDetails(user);
                    dispatch(authActions.login(JSON.stringify(user)));
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const signOutWithFirebase = () => {
        // sign out with firebase
        fireBaseLogout();
        dispatch(authActions.logout());
    }
    useEffect(() => {
        let urlIntab = window.location.href;
        if (urlIntab.includes("/movies")) {
            setShowDropdown("/movies");
            setDropDownItems(dropdownitemsMovies);
        }
        else if (urlIntab.includes("/series") && !urlIntab.includes("/cardsingle")) {
            setShowDropdown("/series");
            setDropDownItems(dropdownitemSeries);   
        }

        // google logged in check
        const auth = getAuth(app);
        auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(authActions.login(JSON.stringify(user)));
                sendSignInDetails(user);
            } else {
                dispatch(authActions.logout());
            }
        });
    }, [userLoggedIn])
    return (
        <Navbar variant="dark" expand="lg" className="'navbar sticky-top" fixed="top">
            <Container fluid>
                <Navbar.Brand href="/"><img src={logo} style={{ width: 85 }} alt=""></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/movies/genre">Movies</NavLink>
                        <NavLink href="/series/genre">Series</NavLink>
                        {/* <Nav.Link href="/latest">Latest</Nav.Link> */}
                        {showDropdown != "" ?
                            <NavDropdown title="Genre" id="basic-nav-dropdown"  >
                                <DisplayDropdown />
                            </NavDropdown>
                            : ""
                        }
                        {userLoggedIn ? <NavLink href="/mylist">My List</NavLink> : ""}
                        <NavLink href="/contact">Contact</NavLink>

                    </Nav>
                    <Link to="/search">
                        <Button variant="outline-dark"><FaSearch style={{ color: "white", fontSize: "1.5em" }} /></Button>
                    </Link>
                    <div className='right-profile active'>
                        {userLoggedIn ?
                            <>
                                <span>{userDetails.displayName.split(" ")[0]}</span>
                                <img
                                    src={userDetails.photoURL}
                                    alt=""
                                />
                                <Button className="login-with-google-btn" onClick={signOutWithFirebase}>
                                    Logout
                                </Button>
                            </>
                            :
                            <Button className="login-with-google-btn" onClick={signInWithFirebase}>
                                Sign in
                            </Button>
                        }
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation