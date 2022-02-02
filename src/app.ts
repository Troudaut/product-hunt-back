import { Container, inject, injectable } from 'inversify';
import Express, { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import http from 'http';
require('source-map-support').install();

import { RootRoutes } from './routes/api/root.routes';
import { IConfig } from './config/config.model';

require('source-map-support').install();
process.on('unhandledRejection', console.log);

@injectable()
export class App {

  private app: Express.Application;

  private server: http.Server;  

  constructor(
    @inject('config') private config: IConfig,
    private rootRoute: RootRoutes,
  ) { }

  async init(): Promise<void> {

    this.app = Express();
    this.server = http.createServer(this.app);

    this.app.use(cors());
    this.app.use(Express.json());
    this.app.use('/', this.rootRoute.createRouter());
    this.app.disable('x-powered-by');
    this.app.enable('etag');
    this.app.use(this.useNotFoundErrorHandler());
    this.app.use(this.useErrorHandler());

    await new Promise<void>((resolve) => {
      this.server.listen(
        this.config.port,
        null,
        () => {
          console.log(`Running server on localhost:${this.config.port}`);
          console.log('Server started');

          resolve();
        },
      );
    });
  }

  private useNotFoundErrorHandler(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      console.log(`Not found path ${req.originalUrl} and method ${req.method}`);
      return next();
    };
  }

  private useErrorHandler(): ErrorRequestHandler {
    return (error: any, req: Request, res: Response, next: NextFunction): void => {
      
      const e = error instanceof Error ? error : new Error(`${error}`);
      res.status(500).json(e);
      return next();
    };
  }

}

export const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' });

export function createApp(config: IConfig): App {
  container.bind<IConfig>('config').toConstantValue(config);
  return container.get<App>(App);
}
