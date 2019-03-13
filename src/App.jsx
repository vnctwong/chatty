import React, { Component } from "react";

import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <MessageList />
        <ChatBar />
      </div>
    );
  }
}
export default App;