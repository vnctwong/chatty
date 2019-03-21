import React, { Component } from 'react';

// formats how message type notification renders
class Notification extends Component {
  render() {
    console.log(this.props.username)

    return (
      <div className="message">
        <span className="message-content"> {this.props.content}</span>
      </div>
    );
  }
}
export default Notification;

