// import axios from 'axios';
import { io } from "socket.io-client";
import { EmitEventType, EmitMessagePayload } from "interface/message";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export default class SocketController {
  private _instance!: ReturnType<typeof io>;
  private user: string | null = null;

  constructor() {
    this._instance = io("ws://localhost:4000", {
      transports: ['websocket'],
    });

    this._instance.on('user', (res) => {
      const user: string = res.username;
      console.log('user is', user);
      this._receiveUserHandlers.forEach((handler) => {
        if (handler) {
          handler(user);
        }
      })
    });

    this._instance.on('count', (res) => {
      console.log('test count', res);
    });
  }

  private _receiveUserHandlers: (((user: string | null) => void) | undefined)[] = [];
  subscribeReceiveUserHandler(handler: (user: string | null) => void): number {
    handler(this.user);
    const len = this._receiveUserHandlers.push(handler);
    return len - 1
  }

  unsubscribeReceiveUserHandler(idx: number) {
    const handler = this._receiveUserHandlers[idx];
    if (handler) {
      delete this._receiveUserHandlers[idx];
    }
  }

  open() {
    if (this._instance.open()) {
      this._instance.open();
    }
  }

  close() {
    this._instance.close();
  }

  sendMessage(text: string) {
    this._instance.emit('message', {
      text,
    });
  }

  enterRoom(room: string) {
    this._instance.emit('enter-room', room);
  }

  private _receiveHandlers: (((arg?: any) => void) | undefined)[] = [];
  addReceiveBroadcastMessageHandler(handler: (arg?: any) => void): number {
    this._instance.on('broadcast', handler);
    const len = this._receiveHandlers.push(handler);
    return len - 1;
  }

  removeReceiveBroadcastMessageHandler(idx: number): boolean {
    const handler = this._receiveHandlers[idx];
    if (handler) {
      this._instance.off('broadcast', this._receiveHandlers[idx]);
      return true;
    } else {
      delete this._receiveHandlers[idx];
      return false;
    }
  }
}


// socket.io.open();

// socket.emit<EmitEventType>("message", {
//   text: "hello world"
// } as EmitMessagePayload);

// socket.close();