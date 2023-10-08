import React, { useState } from "react";
import { Message } from "interface";
import { useSocket } from "frontend/context/socket";

import { AiOutlineSend } from 'react-icons/ai';

export type OnSendedMessage = (message: Message) => void;

type FormData = {
  message: string;
};

const defaultFormData: FormData = {
  message: ""
};

export const MessageSendForm: React.FC<{}> = () => {
  const { socket } = useSocket();

  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const onChange = (name: keyof FormData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((state) => ({
        ...state,
        [name]: e.target.value
      }));
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const payload: Message = {
      text: formData.message,
    };
    socket?.emit('message', payload);
    reset();
  };

  const reset = () => {
    setFormData(defaultFormData);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            id="message"
            value={formData.message}
            onChange={onChange("message")}
            placeholder="보낼 메시지를 입력하세요."
            required
          />
          <button type="submit"><AiOutlineSend /></button>
          </div>
      </form>
    </div>
  );
};
