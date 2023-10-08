import { MessageList } from "frontend/components/MessageList"
import { MessageSendForm } from "frontend/components/MessageSendForm"

import { OnSendedMessage } from '../components/MessageSendForm';
import { SignoutButton } from "frontend/components/SignoutButton";
import { useSocket } from "frontend/context/socket";
import { LeaveRoomButton } from "frontend/components/LeaveRoomButton";

export const ChattingRoomPage = () => {
  const { user, room } = useSocket();

  return (
    <>
    {user && room && (
      <section>
        <div>
          <h1>Chatting [{room.name}]</h1>
          <SignoutButton />
        </div>
        <LeaveRoomButton />
        <div>username : {user.username}</div>
        <MessageSendForm />
        <MessageList />
      </section>
    )}
    </>
  )
}