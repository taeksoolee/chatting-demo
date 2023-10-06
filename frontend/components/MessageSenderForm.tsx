import React, { useContext, useEffect, useState } from "react";
import { SocketContextStore } from "frontend/context";

type FormData = {
  message: string;
};

const defaultFormData: FormData = {
  message: ""
};

export const MessageSenderForm: React.FC<{}> = () => {
  const socket = useContext(SocketContextStore);

  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const onChange = (name: keyof FormData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((state) => ({
        ...state,
        [name]: e.target.value
      }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.controller.sendMessage(formData.message);
    reset();
  };

  const reset = () => {
    setFormData(defaultFormData);
  };

  useEffect(() => {
    console.log("msf ::: mounted");
    return () => {
      console.log("msf ::: unmounted");
    };
  }, []);

  return (
    <div>
      <div>Message Sender Form</div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            id="aa"
            value={formData.message}
            onChange={onChange("message")}
          />
          <input type="submit" value="Send"></input>
        </form>
      </div>
    </div>
  );
};
