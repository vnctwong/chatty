import React, { Component } from 'react';

class Message extends Component {
  render() {
    console.log(this.props.username)
    // console.log(this.props.content)
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content"> {this.props.content}</span>
      </div>
    );
  }
}
export default Message;
