
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { User, ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, Room } from 'interface';
import { Rooms } from 'data';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  // console.log(req.headers);
  res.json({
    message: 'hello world',
  });
});

app.get('/rooms', (req, res) => {
  res.json(Rooms);
})

const server = http.createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    // origin: 'http://localhost:4000',
    // methods: ['GET', 'POST']
  }
});

const userMap = new Map<
  string,
  User & {
    room?: Room,
  }
>();

io.on('connect', (socket) => {
  const state = new Proxy<{
    user: User | null,
    room: Room | null,
  }>({
    user: null,
    room: null,
  }, {

  });

  
  socket.on('signin', (payload) => {
    // TODO: io.auth 를 지원하는 것으로 보임. 현재는 이름만으로 접속 하므로 간단하게 data 연동으로 처리.
    if (state.user) {
      socket.emit('error', {
        message: 'Alread Signed',
      });
      return;
    }
    // console.log(socket.id);
    const finded = userMap.get(payload.username);
    if (finded) {
      socket.emit('error', {
        message: 'Duplicated User',
      });
      return;
    }

    state.user = payload;
    userMap.set(payload.username, payload);
  });

  socket.on('signout', () => {
    if (!state.user) {
      socket.emit('error', {
        message: 'Alread Unsigned',
      });
      return;
    }
    userMap.delete(state.user.username);
    state.user = null;
    state.room = null;
  })

  socket.on('enter-room', (payload) => {
    if (!state.user) {
      socket.emit('error', {
        message: 'No User',
      });
      return;
    }

    const finded = userMap.get(state.user.username);
    if (!finded) {
      socket.emit('error', {
        message: 'Invalid User',
      })
      return;
    }

    finded.room = payload
    userMap.set(state.user.username, finded);
    state.room = payload;

    socket.join(payload.name);
  });

  socket.on('message', (payload) => {
    if (!state.user) {
      socket.emit('error', {
        message: 'No User',
      });
      return;
    }

    if (!state.room) {
      socket.emit('error', {
        message: 'No Selected Room',
      });
      return;
    }

    // socket.broadcast.emit('message', {
    //   message: payload,
    //   user: state.user,
    // });

    socket.to(state.room.name).emit('message', {
      message: payload,
      user: state.user,
    });

    // to own
    socket.emit('message', {
      message: payload,
      user: state.user,
    });
    
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

server.listen(4000, () => {
  console.log('onServer 4000');
});