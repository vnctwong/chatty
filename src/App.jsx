import React, { Component } from "react";

import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous',
      messages: [],
    };

    this.newUser = this.newUser.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  newUser(user) {
    var newUsername = user;
    var content = "Username " + this.state.currentUser + " has changed name to " + newUsername;

    this.setState({ currentUser: user });
    const msgObj = {
      type: "userUpdate",
      username: this.state.currentUser,
      content: content
    };
    this.socket.send(JSON.stringify(msgObj));
    console.log('notification sent to server', msgObj);
  }

  newMessage(content) {
    const msgObj = {
      type: 'message',
      username: this.state.currentUser,
      content: content
    };
    this.socket.send(JSON.stringify(msgObj));
    console.log('message sent to server', msgObj);
  }

  componentDidMount() {
    console.log("componentDidMount app.js");
    this.socket = new WebSocket('ws://localhost:3001');
    // when websockets connect
    this.socket.onopen = () => {
      console.log('server connected');
      this.socket.onmessage = (msgBroadcast) => {
        console.log('server broadcast recieved');
        console.log(msgBroadcast);
        const broadcastMsg = JSON.parse(msgBroadcast.data);

        switch (broadcastMsg.type) { //may have to change for type.notification
          case 'notification': //not being called
            // if changed to userUpdate, server recieves but no broadcast
            // so action needed here, cannot duplicate actions in default 
            break;
          default:
            let messages = this.state.messages.concat(broadcastMsg)
            this.setState({ messages: messages });
            break;
        }
      }
    };
  }

  render() {
    // console.log(this.state.messages);
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar newUser={this.newUser} newMessage={this.newMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;

