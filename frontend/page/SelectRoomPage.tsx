import React from "react"
import { RoomList } from "frontend/components/RoomList"
import { SignoutButton } from "frontend/components/SignoutButton"
import { useSocket } from "frontend/context/socket"

export const SelectRoomPage: React.FC = () => {
  const { user, room } = useSocket();

  return (
    <>
    {user && !room && (
    <section>
      <div className="between">
        <h1>Room List</h1>
        <div></div>
        <SignoutButton />
      </div>
      <div>username: {user.username}</div>
      <RoomList />
    </section>
    )}
    </>
  )
} 