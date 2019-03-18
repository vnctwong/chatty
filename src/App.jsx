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
      onlineUsers: 0
      // notifications: [],
    };
    this.newUser = this.newUser.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  newUser(user) {

    this.setState({ currentUser: user });
    const payloadObj = {
      type: "notification",
      username: this.state.currentUser,
      content: `Username ${this.state.currentUser} has changed name to ${user}`
    };
    this.socket.send(JSON.stringify(payloadObj));
    console.log('notification sent to server', payloadObj);
  }

  newMessage(content) {

    const payloadObj = {
      type: 'message',
      username: this.state.currentUser,
      content: content
    };
    this.socket.send(JSON.stringify(payloadObj));
    console.log('message sent to server', payloadObj);
  }

  componentDidMount() {
    console.log("componentDidMount app.js");
    this.socket = new WebSocket('ws://localhost:3001');
    // when websockets connect
    this.socket.onopen = () => {
      console.log('server connected');

      // this.socket.onbroadcast = () => {
      //   switch (broadcast.type) {
      //     case 'userCountChange':
      //       this.setState({ onlineUsers: userCount });
      //       break;
      //   }
      // }

      this.socket.onmessage = (payloadBroadcast) => {
        console.log('server broadcast recieved');
        console.log('payloadBroadcast =', payloadBroadcast);

        const broadcastMsg = JSON.parse(payloadBroadcast.data);
        const messages = this.state.messages.concat(broadcastMsg);
        switch (broadcastMsg.type) {

          case 'notification':
            // console.log('some action for case notification')
            this.setState({ messages: messages });  // how to change message display?
            break;

          default:
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
        <NavBar onlineUsers={this.state.onlineUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar newUser={this.newUser} newMessage={this.newMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;

