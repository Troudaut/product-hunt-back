import * as express from 'express';
import { injectable } from 'inversify';
import { asyncMiddleware } from '../../../core/middleware/express.middleware';
import { PostsRoutes } from './posts/posts.routes';
import { V1Filters } from './v1.filters';

@injectable()
export class V1Routes {
  constructor(
    private v1Filters: V1Filters,
    private postsRoutes: PostsRoutes,
  ) { }

  public createRouter(): express.Router {
    const router = express.Router();

    router.all('*', asyncMiddleware( (req: express.Request, res: express.Response, next: express.NextFunction) => this.v1Filters.buildLocals(req, res, next) ));

    router.use('/posts', this.postsRoutes.createRouter());

    return router;
  }
}
