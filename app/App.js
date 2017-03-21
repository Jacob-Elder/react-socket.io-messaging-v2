import React from 'react';
import styles from './App.css';
import io from 'socket.io-client'

const socket = io.connect('10.0.1.19:8081')

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}
