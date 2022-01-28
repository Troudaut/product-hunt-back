import 'reflect-metadata';

import { ConfigReader } from './config/config-reader';
import { createApp } from './app';

new ConfigReader()
  .readConfig().then((config) => {
    const app = createApp(config);
    console.log('App created');
    return app.init();
  })
  .catch((err) => {
    console.error('App could not start :', err.message);
    process.exit(1);
  });