import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer>
        <div className='chatbar'>
          <input className="chatbar-username" name='username' placeholder="Your Name (Optional)" />
          <input className="chatbar-message" name='message' placeholder="Type a message and hit ENTER" />
        </div>
      </footer>
    );
  }
}

export default ChatBar;