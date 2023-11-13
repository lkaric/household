import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const prefix = configService.get('APPLICATION_PREFIX');
  const env = configService.get('APPLICATION_ENV');
  const port = parseInt(configService.get('APPLICATION_PORT') ?? '4200', 10);

  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('household API')
    .setDescription('The household API description')
    .addBearerAuth(
      { description: 'Standard JWT Authentication', type: 'http' },
      'JWT'
    )
    .setVersion('1.0')
    .addTag('IAM')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port, () => {
    if (env === 'local') {
      Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${prefix}`
      );
      Logger.log(
        `📖 Docs are running on: http://localhost:${port}/${prefix}/docs`
      );
    }
  });
}

bootstrap();
