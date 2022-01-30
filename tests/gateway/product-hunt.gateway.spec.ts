import { expect } from 'chai';
import 'mocha';
import nock from 'nock';
import 'reflect-metadata';

import { IConfig } from '../../src/config/config.model';
import { ProductHuntGateway } from '../../src/gateway/product-hunt.gateway';
import { ExpectCounter } from '../counter/expect.counter';
nock.disableNetConnect();


const productHuntWillRespondWith = (posts: { name: string }[], day?: string) => {
  const productHuntResponse = {
    posts: posts.map(post => ({
      name: post.name,
    })),
  };

  if (day?.length) {
    nock('https://api.producthunt.com/v1')
      .get('/posts')
      .query({ day })
      .reply(200, productHuntResponse)
      .persist();
  } else {
    nock('https://api.producthunt.com/v1')
      .get('/posts')
      .reply(200, productHuntResponse)
      .persist();
  }
};


describe('Retrieving posts from Product Hunt', () => {

  let productHuntGateway: ProductHuntGateway;

  beforeEach(() => {
    const config = <IConfig>{};
    productHuntGateway = new ProductHuntGateway(config);
  });

  it('should retrieve the last posts', async () => {
    const posts = [
      { name: 'Exemple1' },
      { name: 'Exemple2' },
      { name: 'Exemple3' },
      { name: 'Exemple4' },
    ];
    productHuntWillRespondWith(posts);

    const receivedPosts = await productHuntGateway.retrieveLastPostsFromDay();

    expect(receivedPosts).to.deep.equal([
      { name: 'Exemple1' },
      { name: 'Exemple2' },
      { name: 'Exemple3' },
      { name: 'Exemple4' },
    ]);
    
  });

  it('should retrieve the last posts from a specific day', async () => {
    const day = '2021-12-25';
    const posts = [
      { name: 'Exemple1' },
      { name: 'Exemple2' },
      { name: 'Exemple3' },
      { name: 'Exemple4' },
    ];
    productHuntWillRespondWith(posts, day);

    const receivedPosts = await productHuntGateway.retrieveLastPostsFromDay(day);

    expect(receivedPosts).to.deep.equal([
      { name: 'Exemple1' },
      { name: 'Exemple2' },
      { name: 'Exemple3' },
      { name: 'Exemple4' },
    ]);
  });

  it('should throw an error if wrong format date', async () => {
    const expectCounter = new ExpectCounter(1);
    const day = '2021/12/25';
    
    try {
      await productHuntGateway.retrieveLastPostsFromDay(day);
    } catch (error) {
      expectCounter.expect(error).to.match(/format/);
    }
    expectCounter.assert();
  });

});
