import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'
import {useAuth} from "../context/AuthContext";
import {useRouter} from "next/router";
import Link from 'next/link'
import {useSnackbar} from "../context/SnackbarContextProvider";

const NavbarComp = () => {

    const {user, logout} = useAuth()
    const router = useRouter()
    const {show} = useSnackbar();

    const handleLogout = () => {
        logout();
        router.push("/admin/login").then(() => show("Logged out successfully"))
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link href="/" passHref>
                    <Navbar.Brand>Artrypto</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user ?
                            <Nav.Link className="p-0" onClick={handleLogout}>
                                Logout
                            </Nav.Link>
                            : <>
                                <Link href="/admin/signup" passHref>
                                    Signup
                                </Link>
                                <Link className="ms-2" href="/admin/login" passHref>
                                    Login
                                </Link>
                            </>}
                        <Link className="ms-2" href="/admin/about" passHref>
                            About
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComp