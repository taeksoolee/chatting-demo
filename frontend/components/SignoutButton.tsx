import React from "react"
import { useSocket } from "frontend/context/socket";
import { nopFunction } from "utils";
import { AiOutlineLogout } from 'react-icons/ai';

type OnSignouted = () => void;

export const SignoutButton: React.FC<{
  onSignouted?: OnSignouted
}> = ({
  onSignouted = nopFunction,
}) => {
  const { signout } = useSocket();

  const onClickButton = () => {
    signout();
    onSignouted();
  }

  return (
    <div className="end">
      <button onClick={onClickButton}><AiOutlineLogout /></button>
    </div>
  );
}