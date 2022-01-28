import * as express from 'express';
import { injectable } from 'inversify';

import { V1Routes } from './v1/v1.routes';

@injectable()
export class RootRoutes {
  constructor(
    private v1Routes: V1Routes,
  ) {
  }

  createRouter(): express.Router {
    const router = express.Router();

    router.use('/api/v1', this.v1Routes.createRouter());

    return router;
  }
}