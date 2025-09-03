const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

let cachedApp;

async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  
  app.enableCors({
    origin: '*',
  });

  await app.init();
  cachedApp = app;
  return app;
}

module.exports = async (req, res) => {
  const app = await createApp();
  app.getHttpAdapter().getInstance()(req, res);
};