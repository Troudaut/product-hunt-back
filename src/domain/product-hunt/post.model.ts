export interface ProductHuntPost {
  name: string;
  tagline: string;
  user: { name: string },
  thumbnail: { image_url: string },
  day: string;
}
