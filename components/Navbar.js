import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'
import Link from 'next/link'
import {useAuth} from "../context/AuthContext";
import {useRouter} from "next/router";

const NavbarComp = () => {

    const {user, logout} = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout();
        router.push("/login").then(() => null);
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link href="/" passHref>
                    <Navbar.Brand>Artrypto</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user ?
                            <Nav.Link onClick={handleLogout}>
                                Logout
                            </Nav.Link>
                            : <>
                            <Link href="/signup" passHref>
                                Signup
                            </Link>
                            <Link className="ms-2" href="/login" passHref>
                                Login
                            </Link>
                        </>}
                        <Link className="ms-2" href="/about" passHref>
                            About
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComp