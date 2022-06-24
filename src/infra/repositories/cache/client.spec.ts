import { assert, expect } from 'chai';
import sinon from 'sinon';
import { CacheClient } from '..';

describe('Repositories - Cache - Client', () => {
  describe('get', () => {
    it('Should get with successfully', async () => {
      const cache_fake = {
        get: sinon.fake.resolves('yolo'),
      };

      // @ts-ignore
      const cache_client = new CacheClient(cache_fake);

      const result = await cache_client.get('yolo');
      expect(result).to.be.eqls('yolo');
      assert(cache_fake.get.calledOnceWith('yolo'));
    });

    it('Should get with null', async () => {
        const cache_fake = {
          get: sinon.fake.resolves(null),
        };
  
        // @ts-ignore
        const cache_client = new CacheClient(cache_fake);
  
        const result = await cache_client.get('yolo');
        expect(result).to.be.eqls(null);
        assert(cache_fake.get.calledOnceWith('yolo'));
      });
  });
  describe('set', () => {
    it('Should set with successfully', async () => {
      const cache_fake = {
        set: sinon.fake.resolves(undefined),
      };

      // @ts-ignore
      const cache_client = new CacheClient(cache_fake);
      await cache_client.set('yolo', 'yolo');
      assert(cache_fake.set.calledOnceWith('yolo', 'yolo'));
    });
  });
  describe('setWithExpirationTime', () => {
    it('Should set with expiration time with successfully', async () => {
      const cache_fake = {
        set: sinon.fake.resolves(undefined),
      };

      // @ts-ignore
      const cache_client = new CacheClient(cache_fake);
      await cache_client.setWithExpirationTime('yolo', 'yolo', 10);
      assert(cache_fake.set.calledOnceWith('yolo', 'yolo', 'EX', 10));
    });
  });
});
