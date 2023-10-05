import { MessagePayload } from './../interface/message';
// import axios from 'axios';
import { io } from 'socket.io-client';
import { EventType } from '../interface/message';

import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

// const api = axios.create({
//   baseURL: 'http://localhost:4000',
// });

// api.get('/').then((res) => {
//   console.log(res);
// });


// const manager = new Manager('http://localhost:4000',{
//   autoConnect: false,
// });
// const socket = manager.socket("/");
// socket.io.open((err) => {
//   if (err) {
//     console.error(err);
//     // an error has occurred
//   } else {

//     console.log('opened')
//     // the connection was successfully established
//   }
// });

const socket = io('ws://localhost:4000', {
  
});
socket.io.open();

socket.emit<EventType>('message', {
  text: 'hello world',
} as MessagePayload);

// socket.close();

@customElement('message-box')
class MessageBox extends LitElement {
  static styles = css`p {color: red}`;

  @property()
  text: string = 'Message Box';

  render() {
    return html`
      <div>${this.text}</div>
    `;
  } 
}

@customElement('my-app')
class App extends LitElement {
  render() {
    return html`
      <div>
        <message-box></message-box>
      </div>
    `
  }
}