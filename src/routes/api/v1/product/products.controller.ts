import { injectable } from 'inversify';


@injectable()
export class ProductsController {

  public async search(req: Request, res: Response): Promise<void> {
    console.log('Search');
  }

}