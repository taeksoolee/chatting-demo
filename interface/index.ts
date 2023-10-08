export type User = {
  username: string,
}

export type Room = {
  name: string,
}

export type Message = {
  text: string,
}

// 
export interface ServerToClientEvents {
  'error': (payload: { message: string }) => void;
  'message': (payload: { message: Message, user: User }) => void;
}

export interface ClientToServerEvents {
  'signin': (payload: { username: string }) => void,
  'signout': () => void,
  'enter-room': (payload: Room) => void,
  'message': (payload: Message) => void,
}

export interface InterServerEvents {
  // ping: () => void;
}

export interface SocketData {
  
}