import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', content: '' };
    this.compose = this.compose.bind(this);
    this.msgContentUpdate = this.msgContentUpdate.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.userKeyPress = this.userKeyPress.bind(this);
    this.userUpdate = this.userUpdate.bind(this);
  }

  keyPress(event) {
    if (event.keyCode == 13) {
      this.props.newMessage(this.state.content);
      this.setState({ content: '' });
    }
  }

  userKeyPress(event) {
    if (event.keyCode == 13) {
      this.props.newUser(this.state.user);
      //this.setState({ user: '' });
    }
  }

  compose(event) {
    this.setState((prev, props) => ({
      content: ''
    }));
  }

  msgContentUpdate(event) {
    this.setState({
      content: event.target.value
    });
  }

  userUpdate(event) {
    this.setState({
      user: event.target.value
    });
  }

  render() {
    return (
      <footer>
        <div className='chatbar'>
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            value={this.state.user}
            onChange={this.userUpdate}
            onKeyDown={this.userKeyPress} />

          <input
            className="chatbar-message"
            name='message'
            placeholder="Type a message and hit ENTER"
            value={this.state.content}
            onChange={this.msgContentUpdate}
            onKeyDown={this.keyPress} />
        </div>
      </footer>
    );
  }
}
export default ChatBar;