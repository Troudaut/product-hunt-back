import * as express from 'express';
import { injectable } from 'inversify';
import { asyncMiddleware } from '../../../../middleware/express.middleware';
import { ProductsController } from './products.controller';


@injectable()
export class ProductsRoutes {

  constructor(
    private productsController: ProductsController,
  ) {
  }

  public createRouter(): express.Router {
    const router = express.Router();

    router.use('/', asyncMiddleware((req: Request, res: Response) => this.productsController.search(req, res)));

    return router;
  }

}