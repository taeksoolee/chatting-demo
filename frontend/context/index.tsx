import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState
} from "react";
import SocketController from "frontend/service/socket";

const socketController = new SocketController();
export const SocketContextStore = createContext<{
  controller: SocketController;
}>({
  controller: socketController
});

export const SocketContext: React.FC<PropsWithChildren<{}>> = (props) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    socketController.open();
    const idx = socketController.subscribeReceiveUserHandler((user) =>
      setUser(user)
    );

    return () => {
      socketController.close();
      socketController.unsubscribeReceiveUserHandler(idx);
    };
  }, []);

  return (
    <SocketContextStore.Provider
      value={{
        controller: socketController
      }}
    >
      {user}
      {props.children}
    </SocketContextStore.Provider>
  );
};
