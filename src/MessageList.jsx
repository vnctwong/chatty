import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className='messagelist'>
        < Message />
      </main>
    );
  }
}
export default MessageList;