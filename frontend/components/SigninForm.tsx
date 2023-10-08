import React, { useState } from "react"
import { useSocket } from "frontend/context/socket";

import { AiOutlineLogin } from 'react-icons/ai';

type FormData = {
  id: string,
}

const defaultFormData: FormData = {
  id: '',
};

export const SigninForm: React.FC<{}> = () => {
  const { signin } = useSocket();

  const [formData, setFormData] = useState(defaultFormData);

  const onChange = (name: keyof FormData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((state) => ({
        ...state,
        [name]: e.target.value
      }));
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signin({
      username: formData.id,
    });
    reset();
  }

  const reset = () => {
    setFormData(defaultFormData);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input value={formData.id} onChange={onChange('id')} autoComplete="username" required placeholder="사용 할 닉네임을 입력하세요."/>
          {/* <input value={formData.password} onChange={onChange('password')} type="password" autoComplete="current-password" /> */}
          <button type="submit"><AiOutlineLogin /></button>
        </div>
      </form>
    </div>
  )
}