import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'
import Link from 'next/link'
import LogoIcon from "../src/layouts/logo/LogoIcon";

const NavbarComp = () => {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LogoIcon toLink={"/"}/>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className="ms-2" href="/admin/" passHref>
                            To Admin
                        </Link>
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