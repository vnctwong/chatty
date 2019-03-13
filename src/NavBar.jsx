import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <header>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
      </header>
    );
  }
}

export default NavBar;