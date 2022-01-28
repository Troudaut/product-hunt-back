import express from 'express';
import { injectable } from 'inversify';

@injectable()
export class V1Filters {

  /**
   * Set des valeurs de context dans le res locals de express
   */
  async buildLocals(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    res.locals.user = req.header('Authorization');
    res.locals.language = req.query.lang;

    next();
  }
}
