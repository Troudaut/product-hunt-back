import { expect } from 'chai';
import 'mocha';
import nock from 'nock';
nock.disableNetConnect();


const productHuntWillRespondWith = (products: { name: string }[]) => {
  nock('https://example.com').get('/').reply(200, products).persist();
}

import { ProductHuntGateway } from '../../src/gateway/product-hunt.gateway';

describe('Retrieving products from Product Hunt', () => {

  it('should retrieve the last products', async () => {
    productHuntWillRespondWith([
      {
        name: 'Exemple1'
      },
      {
        name: 'Exemple2'
      },
      {
        name: 'Exemple3'
      },
      {
        name: 'Exemple4'
      }
    ]);
    const productHuntGateway = new ProductHuntGateway();

    const products = await productHuntGateway.retrieveLastProducts();

    expect(products).to.deep.equal([
      {
        name: 'Exemple1'
      },
      {
        name: 'Exemple2'
      },
      {
        name: 'Exemple3'
      },
      {
        name: 'Exemple4'
      }
    ])
    
  });

});
