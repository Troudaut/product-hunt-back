import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { ProductHuntGateway } from '../../../../gateway/product-hunt.gateway';
import { QueryParamsValidator } from '../../../../core/decorators/validators.decorators';
import { RETRIEVE_POSTS_JOI_SCHEMA } from './posts.validation';


@injectable()
export class PostsController {

  constructor(
    private productHuntGateway: ProductHuntGateway,
  ) { }

  @QueryParamsValidator(RETRIEVE_POSTS_JOI_SCHEMA, { stripUnknown: true })
  public async retrievePosts(req: Request, res: Response): Promise<void> {
    const day = req.query.day as string;

    try {
      const posts = await this.productHuntGateway.retrieveLastPostsFromDay(day);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

}