import { ClientToServerEvents, ServerToClientEvents } from "interface";
import { Socket } from "socket.io-client";

export type ClientSocket = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;

export type Message = Parameters<ServerToClientEvents['message']>[0];