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

export const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>();
  useEffect(() => {
    setSocket(
      io(WEB_SOCKET_URL, {
        path: '',
        transports: ['websocket'],
      }),
    );
  }, []);

  socket &&
    socket.on('status', (data) => {
      setStatus(data);
    });

  socket &&
    socket.on('connect', () => {
      setConnected(true);
    });

  socket &&
    socket.on('disconnect', () => {
      setConnected(false);
    });

  return (
    <RootEl isAllGood={status ?? false}>
      {connected && socket ? (
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
