import React from "react";
import { SigninPage } from "./SigninPage";
import { SelectRoomPage } from "./SelectRoomPage";
import { ChattingRoomPage } from "./ChattingRoomPage";
import { useSocket } from "frontend/context/socket";

export const RoutingPage: React.FC = () => {
  const { user } = useSocket();

  if (!user) {
    return <SigninPage />;
  }

  return (
    <>
      <SelectRoomPage />
      <ChattingRoomPage />
    </>
  );
};
