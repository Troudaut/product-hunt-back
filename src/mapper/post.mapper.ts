import { injectable } from 'inversify';
import { ProductHuntPost } from '../domain/product-hunt/post.model';
import { ProductHuntPostDto } from '../dto/product-hunt-post.dto';

@injectable()
export class ProductHuntPostMapper {

  public toDto(productHuntPost: ProductHuntPost): ProductHuntPostDto {
    return {
      name: productHuntPost.name,
      imageUrl: productHuntPost.thumbnail.image_url,
      username: productHuntPost.user.name,
      description: productHuntPost.tagline,
      day: productHuntPost.day,
    };
  }
}
