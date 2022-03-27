import React, { Component } from "react";
import "../App.css";
export class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="flex-center">
                    <h1>Rock-Paper-Scissors</h1>
                    <p>The adult way to settle your differences</p>
                </div>
            </div>
        );
    }
}

export default Header;
