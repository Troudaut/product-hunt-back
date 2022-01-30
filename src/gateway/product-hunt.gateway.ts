import axios from 'axios';
import { inject, injectable } from 'inversify';
import { IConfig } from '../config/config.model';
import { FormatError } from '../errors/format.error';

interface ProductHuntResponse {
  posts: ProductHuntPost[]
}

interface ProductHuntPost {
  name: string;
}

@injectable()
export class ProductHuntGateway {

  constructor(
    @inject('config') private config: IConfig,
  ) { }

  readonly YYYY_MM_DD_DAY_FORMAT_REGEX = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][\d]|3[01])$/;

  async retrieveLastPostsFromDay(day?: string): Promise<ProductHuntPost[]> {
    if (day?.length > 0 && !this.YYYY_MM_DD_DAY_FORMAT_REGEX.test(day)) {
      throw new FormatError('Invalid date format. Expected format: YYYY-MM-DD');
    }

    const params = { 
      params: { day },
      headers: { Authorization: 'Bearer ' + this.config.productHuntToken },
    };

    const response = await axios.get<ProductHuntResponse>('https://api.producthunt.com/v1/posts', params);
    return response.data.posts;
  }

}
