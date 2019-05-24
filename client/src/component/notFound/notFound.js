import React, { Component } from 'react';
import './scss/notFound.css';

class notFound extends Component {
    render() {
        return (
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Oops! Nothing was found</h2>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <a href="55">Return to homepage</a></p>
                    <div className="notfound-social">
                        <a href="01"><i className="fab fa-facebook-f" /></a>
                        <a href="23"><i className="fab fa-twitter" /></a>
                        <a href="44"><i className="fab fa-pinterest" /></a>
                        <a href="55"><i className="fab fa-google-plus" /></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default notFound ;