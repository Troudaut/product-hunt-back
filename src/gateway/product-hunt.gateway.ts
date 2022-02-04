import axios from 'axios';
import { inject, injectable } from 'inversify';
import { IConfig } from '../config/config.model';
import { FormatError } from '../core/errors/format.error';
import { ProductHuntResponse } from '../domain/product-hunt/post-response.model';
import { ProductHuntPostDto } from '../dto/product-hunt-post.dto';
import { ProductHuntPostMapper } from '../mapper/post.mapper';

@injectable()
export class ProductHuntGateway {

  readonly productHuntApiRoute = 'https://api.producthunt.com/v1';

  constructor(
    @inject('config') private config: IConfig,
    private productHuntPostMapper: ProductHuntPostMapper,
  ) { }

  readonly YYYY_MM_DD_DAY_FORMAT_REGEX = /^[12]\d{3}\-(0[1-9]|1[012])\-(0[1-9]|[12][\d]|3[01])$/;

  async retrieveLastPostsFromDay(day?: string): Promise<ProductHuntPostDto[]> {
    console.log(day);
    if (day?.length > 0 && !this.YYYY_MM_DD_DAY_FORMAT_REGEX.test(day)) {
      throw new FormatError();
    }

    const params = { 
      params: { day },
      headers: { Authorization: 'Bearer ' + this.config.productHuntToken },
    };

    const response = await axios.get<ProductHuntResponse>(`${this.productHuntApiRoute}/posts`, params);
    return response.data.posts.map(post => this.productHuntPostMapper.toDto(post));
  }

}
