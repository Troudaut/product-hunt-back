import { expect } from 'chai';
import 'mocha';
import nock from 'nock';
import 'reflect-metadata';

import { IConfig } from '../../src/config/config.model';
import { ProductHuntPost } from '../../src/domain/product-hunt/post.model';
import { ProductHuntGateway } from '../../src/gateway/product-hunt.gateway';
import { ProductHuntPostMapper } from '../../src/mapper/post.mapper';
import { ExpectCounter } from '../counter/expect.counter';
nock.disableNetConnect();


const productHuntWillRespondWith = (posts: ProductHuntPost[], day?: string): void => {
  const productHuntResponse = {
    posts,
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
    const productHuntPostMapper = new ProductHuntPostMapper();
    productHuntGateway = new ProductHuntGateway(config, productHuntPostMapper);
  });

  it('should retrieve the last posts', async () => {
    const posts: ProductHuntPost[] = [
      { 
        name: 'Exemple1',
        tagline: 'Tagline1',
        user: { name: 'User1' },
        thumbnail: { image_url: 'http://url1.com' },
        day: '2022-01-01',
      },
      { 
        name: 'Exemple2',
        tagline: 'Tagline2',
        user: { name: 'User2' },
        thumbnail: { image_url: 'http://url2.com' },
        day: '2022-01-01',
      },
      { 
        name: 'Exemple3',
        tagline: 'Tagline3',
        user: { name: 'User3' },
        thumbnail: { image_url: 'http://url3.com' },
        day: '2022-01-01',
      },
    ];
    productHuntWillRespondWith(posts);

    const receivedPosts = await productHuntGateway.retrieveLastPostsFromDay();

    expect(receivedPosts).to.deep.equal([
      { 
        name: 'Exemple1',
        description: 'Tagline1',
        username: 'User1',
        imageUrl: 'http://url1.com',
        day: '2022-01-01',
      },
      { 
        name: 'Exemple2',
        description: 'Tagline2',
        username: 'User2',
        imageUrl: 'http://url2.com',
        day: '2022-01-01',
      },
      { 
        name: 'Exemple3',
        description: 'Tagline3',
        username: 'User3',
        imageUrl: 'http://url3.com',
        day: '2022-01-01',
      },
    ]);
    
  });

  it('should retrieve the last posts from a specific day', async () => {
    const day = '2021-12-25';
    const posts: ProductHuntPost[] = [
      { 
        name: 'Exemple1',
        tagline: 'Tagline1',
        user: { name: 'User1' },
        thumbnail: { image_url: 'http://url1.com' },
        day: '2021-12-25',
      },
      { 
        name: 'Exemple2',
        tagline: 'Tagline2',
        user: { name: 'User2' },
        thumbnail: { image_url: 'http://url2.com' },
        day: '2021-12-25',
      },
      { 
        name: 'Exemple3',
        tagline: 'Tagline3',
        user: { name: 'User3' },
        thumbnail: { image_url: 'http://url3.com' },
        day: '2021-12-25',
      },
    ];
    productHuntWillRespondWith(posts, day);

    const receivedPosts = await productHuntGateway.retrieveLastPostsFromDay(day);

    expect(receivedPosts).to.deep.equal([
      { 
        name: 'Exemple1',
        description: 'Tagline1',
        username: 'User1',
        imageUrl: 'http://url1.com',
        day: '2021-12-25',
      },
      { 
        name: 'Exemple2',
        description: 'Tagline2',
        username: 'User2',
        imageUrl: 'http://url2.com',
        day: '2021-12-25',
      },
      { 
        name: 'Exemple3',
        description: 'Tagline3',
        username: 'User3',
        imageUrl: 'http://url3.com',
        day: '2021-12-25',
      },
    ]);
  });

  it('should throw an error if wrong format date', async () => {
    const expectCounter = new ExpectCounter(1);
    const day = '2021/12/25';
    
    try {
      await productHuntGateway.retrieveLastPostsFromDay(day);
    } catch (error) {
      expectCounter.expect(error).to.match(/FORMAT/);
    }
    expectCounter.assert();
  });

});
