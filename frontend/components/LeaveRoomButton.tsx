import { useSocket } from "frontend/context/socket"
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const LeaveRoomButton: React.FC = () => {
  const { leaveRoom } = useSocket();

  const onClickButton = () => {
    leaveRoom();
  }

  return (
    <button onClick={onClickButton}>
      <AiOutlineArrowLeft />
    </button>
  )
}