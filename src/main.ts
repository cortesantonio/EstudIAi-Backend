import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  await app.listen(3000, '0.0.0.0');
}
bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});
