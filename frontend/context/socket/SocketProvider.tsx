import { ClientSocket, Message } from "frontend/interface";
import { Room, ServerToClientEvents, User } from "interface";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { nopFunction } from "utils";

export const SocketContextStore = createContext<{
  user: User | null,
  socket: ClientSocket | null,
  signin: (user: User) => void;
  signout: () => void;
  room: Room | null,
  enterRoom: (room: Room) => void;
  leaveRoom: () => void;
  messages: Message[]
  resetMessages: (persist?: boolean) => void,
}>({
  user: null,
  socket: null,
  signin: nopFunction,
  signout: nopFunction,
  room: null,
  enterRoom: nopFunction,
  leaveRoom: nopFunction,
  messages: [],
  resetMessages: nopFunction,
});

export const SocketProvider: React.FC<PropsWithChildren<{
  socket: ClientSocket,
}>> = ({
  socket,
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [room, setRoom] = useState<Room | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const signin = (user: User) => {
    socket.emit('signin', user);
    setUser(() => user);
  }

  const signout = () => {
    socket.emit('signout');
    setUser(() => null);
  }

  const enterRoom = (room: Room) => {
    socket.emit('enter-room', room);
    setRoom(() => room);
    resetMessages();
  }

  const leaveRoom = () => {
    setRoom(() => null);
    resetMessages();
  }

  const resetMessages = () => {
    const _messages = messages;
    console.log(_messages);
    setMessages(() => []);
  }

  useEffect(() => {
    socket.open();

    const errorHandler: ServerToClientEvents['error'] = (payload) => {
      if (payload.message === 'No User') {
        signout();
      }
      console.log(payload.message);
      console.error(payload.message);
    }
    socket.on('error', errorHandler);

    const messageHandler: ServerToClientEvents['message'] = (payload) => {
      setMessages(messages => [...messages, payload]);
    }
    socket.on('message', messageHandler);

    return () => {
      socket.close();
      socket.off('error', errorHandler);
      socket.off('message', messageHandler);
    };
  }, []);

  return (
    <SocketContextStore.Provider
      value={{
        socket,
        user,
        signin,
        signout,
        room,
        enterRoom,
        leaveRoom,
        messages,
        resetMessages,
      }}
    >
      {children}
    </SocketContextStore.Provider>
  );
};
