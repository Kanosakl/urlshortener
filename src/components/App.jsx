import React from 'react';
import { Navbar } from 'react-bootstrap';
import { UrlShortener } from './UrlShortener';

export const App = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="true">
                <Navbar.Brand>Url Shortener</Navbar.Brand>
            </Navbar>
            <UrlShortener />
        </div>
    )
}
