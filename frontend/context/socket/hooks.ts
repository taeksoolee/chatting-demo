import { useContext } from 'react';
import { SocketContextStore } from './SocketProvider';
export const useSocket = () => {
  const ctx = useContext(SocketContextStore);
  return ctx;
}