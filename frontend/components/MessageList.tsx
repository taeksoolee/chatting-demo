import React from "react";
import { useSocket } from 'frontend/context/socket';
import c from 'classnames';


type ItemOf<T> = T extends Array<infer V> ? V : T;

export const MessageList: React.FC<{}> = () => {
  const { user, messages: data }  = useSocket();
  const isOwn = (e: ItemOf<typeof data>) => e.user.username === user?.username;

  return (
    <article>
      <h2>Message List</h2>
      {data.length === 0 && <div>Not Found Message</div>}
      {data.map((e, idx) => {
        const own = isOwn(e);
        const className = c([ 'message', { own } ]);
        return (
          <div 
            key={idx} 
            {...{className}}
          >
            {own 
              ? (<span >{e.user.username} / <span className="text">{e.message.text}</span></span>) 
              : (<span ><span className="text">{e.message.text}</span> / {e.user.username}</span>)}
          </div>
        )
      })}
    </article>
  );
};
