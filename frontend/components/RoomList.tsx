import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Room } from "interface";
import { useSocket } from "frontend/context/socket";

import c from 'classnames';

export type OnSelectedRoom = (room: string) => void;

export const RoomList: React.FC<{}> = () => {
  const { enterRoom } = useSocket();

  const { data: rooms } = useQuery<Room[]>(["rooms"], () => {
    return axios
      .get<Room[]>("//localhost:4000/rooms")
      .then((res) => res.data)
  });

  const selectRoom = (room: Room) => {
    enterRoom(room);
  };

  // useEffect(() => {
  //   if (rooms && rooms.length > 0) {
  //     selectRoom(rooms[0]);
  //   }
  // }, [rooms]);

  return (
    <article>
      {rooms?.map((e, idx) => (
        <button
          key={idx}
          onClick={() => selectRoom(e)}
          // className={c('full', {active: room.name === e.name})}
          className={c('full')}
        >
          {e.name ? e.name : "None"}
        </button>
      ))}
    </article>
  );
};
