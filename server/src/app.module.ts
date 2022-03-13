import { Module } from '@nestjs/common';
import { AppGateway } from 'server/src/app.gateway';

@Module({
  providers: [AppGateway],
})
export class AppModule {}
