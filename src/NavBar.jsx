import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <header>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="user-count">Users Online:{this.props.onlineUsers}</p>
        </nav>
      </header>
    );
  }
}

export default NavBar;