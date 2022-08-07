import React, { useEffect } from 'react';
import { Navbar, Nav, Button, Container, NavDropdown, NavLink } from 'react-bootstrap';
import './Navbar.scss';
import { FaSearch } from 'react-icons/fa';
import { MdNotificationsNone } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dropdownitems } from "./dropdown-items";
import logo from '../../assets/images/logo.png';

function Navigation() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState("");

    const DisplayDropdown = () => {
        // iterate through dropdown items and display
        return dropdownitems.map((item, index) => {
            return (
                <NavDropdown.Item href={`${showDropdown}/${item.toLowerCase()}`} key={index}>{item}</NavDropdown.Item >
            )
        })

    }
    useEffect(() => {
        let urlIntab = window.location.href;
        console.log("this is the link in tab", urlIntab);
        if (urlIntab.includes("/movies")) {
            setShowDropdown("/movies");
        }
        else if (urlIntab.includes("/series") && !urlIntab.includes("/cardsingle")) {
            setShowDropdown("/series");
        }
    }, [])
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
                        <Nav.Link href="#mylist">My List</Nav.Link>
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation