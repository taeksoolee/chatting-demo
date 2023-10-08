import React from "react";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ClientSocket } from "frontend/interface";
import { io } from "socket.io-client";

import { SocketProvider } from "frontend/context/socket";
import { RoutingPage } from "./page/RoutingPage";

const queryClient = new QueryClient();
const socket: ClientSocket = io("ws://localhost:4000", {
  transports: ['websocket'],
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider socket={socket}>
        <RoutingPage />
      </SocketProvider>
    </QueryClientProvider>
  );
};
