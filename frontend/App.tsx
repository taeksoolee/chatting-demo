import React, { useState } from "react";
import { SocketContext } from "frontend/context";
import { MessageSenderForm } from "frontend/components/MessageSenderForm";
import { MessageList } from "frontend/components/MessageList";
import { RoomList } from "frontend/components/RoomList";

import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App: React.FC = (props) => {
  const [s, _s] = useState(true);
  return (
    <>
      {/* <React.StrictMode> */}
      <button onClick={() => _s((s) => !s)}>T</button>
      {s && (
        <SocketContext>
          <QueryClientProvider client={queryClient}>
            <RoomList />
            <hr />
            <MessageList />
            <MessageSenderForm />
          </QueryClientProvider>
        </SocketContext>
      )}
      {/* </React.StrictMode> */}
    </>
  );
};
