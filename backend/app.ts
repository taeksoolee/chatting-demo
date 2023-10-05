
import http from 'http';
import express from 'express';
import {Server} from 'socket.io';
import cors from 'cors';
import { MessagePayload, EventType } from '../interface/message';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  // console.log(req.headers);
  res.json({
    message: 'hello world',
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: 'http://localhost:4000',
    // methods: ['GET', 'POST']
  }
});

io.on('connect', (client) => {
  console.log('connected')
  // console.log(client);
  
  client.on<EventType>('message', (data: MessagePayload) => {
    console.log('received data :: ' + data.text);
  });

  client.on('disconnect', () => {
    console.log('disconnected');
  });
});

server.listen(4000, () => {
  console.log('onServer 4000');
});