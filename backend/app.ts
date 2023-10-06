
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { EmitMessagePayload, EmitEventType } from '../interface/message';

const rooms = [
  'python',
  'javascript',
  'typescript:react',
  'dart:flutter'
];

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  // console.log(req.headers);
  res.json({
    message: 'hello world',
  });
});

app.get('/rooms', (req, res) => {
  res.json(rooms);
})

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: 'http://localhost:4000',
    // methods: ['GET', 'POST']
  }
});

let users = [];
io.on('connect', (socket) => {
  console.log('connected')
  // console.log(client);

  const user = users.length;

  const isOdd = user % 2 === 0;
  if (isOdd) {
    socket.join('/test-room');
  }
  users.push(users.length);

  socket.emit('user', {
    username: `${user}`,
  });

  let cnt = 0;
  let id = setInterval(() => {
    cnt += 1;
    console.log('count', cnt);
    socket.emit('count', cnt);
  }, 5000);


  socket.on<EmitEventType>('message', (data: EmitMessagePayload) => {
    console.log('received data :: ' + data.text);

    socket.to('/test-room').emit('broadcast', {
      text: data.text + ' ... test-room',
    });

    socket.broadcast.emit('broadcast', {
      text: data.text,
    });
  });

  socket.on('enter-room', (room: string) => {
    console.log(room);
    socket.join(room);
  })

  socket.on('disconnect', () => {
    console.log('disconnected');
    clearInterval(id)
  });
});

server.listen(4000, () => {
  console.log('onServer 4000');
});