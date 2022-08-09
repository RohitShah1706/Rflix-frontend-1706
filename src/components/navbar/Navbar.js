import React, { useEffect } from 'react';
import { Navbar, Nav, Button, Container, NavDropdown, NavLink } from 'react-bootstrap';
import './Navbar.scss';
import { FaSearch } from 'react-icons/fa';
import { MdNotificationsNone } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dropdownitems } from "./dropdown-items";
import logo from '../../assets/images/logo.png';
import { fireBaseLogout } from '../firebaseAuth/fireBaseLogout';
import { fireBaseSignIn } from '../firebaseAuth/fireBaseSignIn';
import { getAuth } from "firebase/auth";
import { app } from '../firebaseAuth/firebaseConfig';
const axios = require('axios');
const sendSignInDetails = (user) => {
    console.log("inside send sign in details")
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
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [showDropdown, setShowDropdown] = useState("");

    const DisplayDropdown = () => {
        // iterate through dropdown items and display
        return dropdownitems.map((item, index) => {
            return (
                <NavDropdown.Item href={`${showDropdown}/${item.toLowerCase()}`} key={index}>{item}</NavDropdown.Item >
            )
        })
    }

    const signInWithFirebase = () => {
        // sign in with firebase
        fireBaseSignIn()
            .then(user => {
                if (user) {
                    // sendSignInDetails(user);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const signOutWithFirebase = () => {
        // sign out with firebase
        fireBaseLogout();
    }
    useEffect(() => {
        let urlIntab = window.location.href;
        if (urlIntab.includes("/movies")) {
            setShowDropdown("/movies");
        }
        else if (urlIntab.includes("/series") && !urlIntab.includes("/cardsingle")) {
            setShowDropdown("/series");
        }

        // google logged in check
        const auth = getAuth(app);
        auth.onAuthStateChanged(user => {
            if (user) {
                setUserLoggedIn(true);
                setUserDetails(user);
                sendSignInDetails(user);
            } else {
                setUserLoggedIn(false);
                if (urlIntab.includes("/mylist")) {
                    // redirect to home page
                    window.location.href = "/";
                }
            }
        });
    }, [userLoggedIn])
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="'navbar sticky-top" fixed="top">
            <Container fluid>
                <Navbar.Brand href="/"><img src={logo} style={{ width: 100 }} alt=""></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/movies/genre">Movies</NavLink>
                        <NavLink href="/series/genre">Series</NavLink>
                        {/* <Nav.Link href="/latest">Latest</Nav.Link> */}
                        {userLoggedIn ? <NavLink href="/mylist">My List</NavLink> : ""}
                        {showDropdown != "" ?
                            <NavDropdown title="Genre" id="basic-nav-dropdown"  >
                                <DisplayDropdown />
                            </NavDropdown>
                            : ""
                        }

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