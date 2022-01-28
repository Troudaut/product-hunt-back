import { Container, inject, injectable } from 'inversify';
import Express from 'express';
import cors from 'cors';
import "reflect-metadata";
require('source-map-support').install();

import { RootRoutes } from './routes/api/root.routes';
import { IConfig } from './config/config.model';

require('source-map-support').install();
process.on('unhandledRejection', console.log);

export const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' });

export function createApp(config: IConfig): App {
  container.bind<IConfig>('config').toConstantValue(config);
  return container.get<App>(App);
}

@injectable()
export class App {

  private app: Express.Application;

  constructor(
    @inject('config') private config: IConfig,
    private rootRoute: RootRoutes
  ) { }

  async init(): Promise<void> {

    this.app = Express();

    this.app.use(cors())
    this.app.use(Express.json())
    this.app.use('/', this.rootRoute.createRouter());
    this.app.disable('x-powered-by');
    this.app.enable('etag');

    this.app.listen(this.config.port, () => console.log(`App listening at http://localhost:${this.config.port}`))
  }

}
