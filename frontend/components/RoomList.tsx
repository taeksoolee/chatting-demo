import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SocketContextStore } from "frontend/context";

import styled from "styled-components";

const Button = styled.button`
  &.active {
    color: red;
  }
`;

export const RoomList: React.FC<{}> = (props) => {
  const socket = useContext(SocketContextStore);

  const { data: rooms } = useQuery<string[]>(["rooms"], () => {
    return axios
      .get<string[]>("//localhost:4000/rooms")
      .then((res) => res.data)
      .then((data) => ["", ...data]);
  });

  const [selected, setSelected] = useState("");

  const selectRoom = (room: string) => {
    socket.controller.enterRoom(room);
    setSelected(() => room);
  };

  useEffect(() => {
    selectRoom("");
  }, []);

  return (
    <div>
      <h1>Room List</h1>
      {rooms?.map((room, idx) => (
        <div key={idx}>
          <Button
            onClick={() => selectRoom(room)}
            className={selected === room ? "active" : ""}
          >
            {room ? room : "None"}
          </Button>
        </div>
      ))}
    </div>
  );
};
