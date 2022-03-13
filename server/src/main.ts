import { NestFactory } from '@nestjs/core';
import { AppModule } from 'server/src/app.module';
import { LOG4JS_CONF } from 'shared/log4js';
import log4js from 'log4js';

log4js.configure(LOG4JS_CONF);

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);
  await nestApp.listen(3000);
}

bootstrap();
