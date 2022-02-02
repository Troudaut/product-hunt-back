import * as express from 'express';
import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { asyncMiddleware } from '../../../../core/middleware/express.middleware';
import { PostsController } from './posts.controller';


@injectable()
export class PostsRoutes {

  constructor(
    private postsController: PostsController,
  ) {
  }

  public createRouter(): express.Router {
    const router = express.Router();

    router.get('/', asyncMiddleware((req: Request, res: Response) => this.postsController.retrievePosts(req, res)));

    return router;
  }

}