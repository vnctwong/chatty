import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messageArray = this.props.messages.map(message => {

      if (message.type === 'message') {
        return <Message key={message.id} username={message.username} content={message.content} />

      } else if (message.type === 'notification') {
        return <Notification key={message.id} content={message.content} />
      }

    });

    return (
      <main className='messagelist'>
        {messageArray}
      </main>
    );
  }
}
export default MessageList;
