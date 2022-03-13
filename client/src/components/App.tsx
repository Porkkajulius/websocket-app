import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import styled from 'styled-components';

const WEB_SOCKET_URL = 'http://localhost:3000/';

interface RootEl {
  isAllGood: boolean;
}

const RootEl = styled.div<RootEl>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  ${(props) => (props.isAllGood ? `color: green;` : `color: red;`)}

  > * {
    padding: 10px;
  }
`;

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket>();
  const [status, setStatus] = useState<boolean>();
  useEffect(() => {
    setSocket(
      io(WEB_SOCKET_URL, {
        path: '',
        transports: ['websocket'],
      }),
    );
  }, [setSocket]);

  console.log('connected', socket?.connected);

  socket &&
    socket.on('status', (data) => {
      setStatus(data);
    });

  return (
    <RootEl isAllGood={status ?? false}>
      {socket?.connected ? (
        <>
          <p>Connected: {status ? 'All good' : 'All broken'}</p>
          <button onClick={() => socket.emit('status', !status)}>
            Update state
          </button>
        </>
      ) : (
        <p>Not connected</p>
      )}
    </RootEl>
  );
};
