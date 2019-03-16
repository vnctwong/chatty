import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const messageArray = this.props.messages.map(message => {
      // console.log()
      return <Message key={message.id} username={message.username} content={message.content} />
    });

    return (
      <main className='messagelist'>
        {messageArray}
      </main>
    );
  }
}
export default MessageList;
