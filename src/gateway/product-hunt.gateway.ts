import axios from 'axios';

export class ProductHuntGateway {

  async retrieveLastProducts(): Promise<{name: string}[]> {
    const response = await axios.get<{ name: string }[]>('https://example.com');
    return response.data;
  }
}