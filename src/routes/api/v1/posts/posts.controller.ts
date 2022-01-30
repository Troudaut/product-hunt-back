import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { ProductHuntGateway } from '../../../../gateway/product-hunt.gateway';


@injectable()
export class PostsController {

  constructor(
    private productHuntGateway: ProductHuntGateway,
  ) { }

  public async search(req: Request, res: Response): Promise<void> {
    const day = req.params.day;
    try {
      const posts = await this.productHuntGateway.retrieveLastPostsFromDay(day);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

}