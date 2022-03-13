import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Socket, Server } from 'socket.io';
import log4js from 'log4js';
import { debounce } from 'lodash';

const logger = log4js.getLogger('App Gateway');
let status = true;

@WebSocketGateway()
export class AppGateway implements NestGateway {
  server: Server;
  afterInit() {
    logger.info('AppGateway initialized');
  }

  handleConnection(socket: Socket) {
    logger.info('New connection', socket.id);
    socket.emit('status', status);
  }

  handleDisconnect(socket: any) {
    logger.info('Disconnect', socket.id);
  }

  @SubscribeMessage('status')
  handleStatusChange(
    @MessageBody() data: boolean,
    @ConnectedSocket() socket: Socket,
  ) {
    logger.info('Data from socket', socket.id);
    try {
      status = data;
      tryEmitStatus(socket);
    } catch (err) {
      logger.error(`Error while updating status with incoming data ${err}`);
    }
  }
}

const emitStatus = (socket: Socket) => {
  // Fix me: We want to emit status change for all connections.
  // Better solution would be to use this.server.emit but it's not working with current version
  socket.broadcast.emit('status', status);
  socket.emit('status', status);
};

const tryEmitStatus = debounce(emitStatus, 200);
