import * as express from 'express';
import { injectable } from 'inversify';
import { asyncMiddleware } from '../../../middleware/express.middleware';
import { ProductsRoutes } from './product/products.routes';
import { V1Filters } from './v1.filters';

@injectable()
export class V1Routes {
  constructor(
    private v1Filters: V1Filters,
    private productsRoutes: ProductsRoutes,
  ) { }

  public createRouter(): express.Router {
    const router = express.Router();

    router.all('*', asyncMiddleware(
      (req: express.Request, res: express.Response, next: express.NextFunction
      ) => this.v1Filters.buildLocals(req, res, next)
    ));

    router.use('/products', this.productsRoutes.createRouter());

    return router;
  }
}
