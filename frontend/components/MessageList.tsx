import { SocketContextStore } from "frontend/context";
import React, { useContext, useEffect, useState } from "react";

export const MessageList: React.FC = () => {
  const socket = useContext(SocketContextStore);
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const idx = socket.controller.addReceiveBroadcastMessageHandler((res) => {
      console.log("broadcast", res);
      setList((list) => [...list, res.text]);
    });
    return () => {
      socket.controller.removeReceiveBroadcastMessageHandler(idx);
    };
  }, []);

  return (
    <div>
      <div>Message List</div>
      {list.map((text, idx) => (
        <div key={idx}>{text}</div>
      ))}
    </div>
  );
};
