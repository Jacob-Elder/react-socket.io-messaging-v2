import React from 'react'
import './style.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './components/Header/Header.js'
import UsersList from './components/UsersList/UsersList.js'
import UserDropdown from './components/UserDropdown/UserDropdown.js'
import MessageList from './components/MessageList/MessageList.js'
import MessageForm from './components/MessageForm/MessageForm.js'
import PickUsername from './components/PickUsername/PickUsername.js'
import io from 'socket.io-client'
const socket = io.connect('react-messaging.us-west-2.elasticbeanstalk.com')
var messageList;
var newUser;

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      signedIn: false,
      users: [],
      messages: [],
      text: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this._messageRecieve = this._messageRecieve.bind(this)
    this._userJoined = this._userJoined.bind(this)
    this._userLeft = this._userLeft.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.submitUsername = this.submitUsername.bind(this)
  }

  componentDidMount () {
    socket.on('send:message', this._messageRecieve)
    socket.on('user:join', this._userJoined)
    socket.on('user:left', this._userLeft)
  }

  submitUsername (name) {
    this.setState({
      username: name,
      signedIn: true
    })
    socket.emit('user:join', name)
  }

  _messageRecieve (message) {
    console.log('messaged recieved');
    var {messages} = this.state
    messages.push(message)
    this.setState({messages})
    window.scrollTo(0,document.body.scrollHeight)
  }

  _userJoined (name, users, messages) {
    console.log(name + ' joined')
    this.setState({
      users: users,
      messages: messages
    })
  }

  _userLeft (data) {
    console.log('user left')
    this.setState({
      users: data.users,
      messages: data.messages
    })
  }

  handleMessageSubmit (message) {
    socket.emit('send:message', message)
    console.log('message sent' + message)
    messageList = document.getElementsByClassName('message-list')
    messageList.scrollTop = messageList.scrollHeight;
  }

  render () {
    if (this.state.signedIn) {
      return (
        <MuiThemeProvider>
        <div>
          <Header headerClass='app-header' />
          <UserDropdown
            users={this.state.users}
          />
          <UsersList
            users={this.state.users}
          />
          <MessageList
            className='message-list'
            messages={this.state.messages}
          />
          <MessageForm
            onMessageSubmit={this.handleMessageSubmit}
            user={this.state.username}
          />
        </div>
        </MuiThemeProvider>
      )
    } else {
      return (
        <MuiThemeProvider>
        <div>
          <Header headerClass='home-header' />
          <PickUsername
            submitUsername={this.submitUsername}
          />
        </div>
        </MuiThemeProvider>
      )
    }
  }

}

export default App
