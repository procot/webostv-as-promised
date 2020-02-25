import { assert } from 'chai';
import { promisifyRequest } from '../src/promisifyRequest';

describe('promisifyRequest', () => {
  it('promised method should return promise because `returnObject` arg is false or undefined', async () => {
    const fn = ({ onSuccess }: RequestParams<number>) => setTimeout(() => onSuccess(3), 100);

    const promisedFn1 = promisifyRequest(fn);
    const result1 = promisedFn1();
    assert.instanceOf(result1, Promise);
    assert.equal(await result1, 3);

    const promisedFn2 = promisifyRequest(fn, false);
    const result2 = promisedFn2();
    assert.instanceOf(result2, Promise);
    assert.equal(await result2, 3);
  });

  it('promised method should return object because `returnObject` arg is true', async () => {
    const fn = ({ onSuccess, param1 }: RequestParams<number> & { param1: string }) => {
      const timeout = setTimeout(() => onSuccess(3));

      return {
        cancel: () => clearTimeout(timeout),
        a: 5,
        s: 'foo',
        param1
      };
    };

    const promisedFn = promisifyRequest(fn, true);
    const result = promisedFn({ param1: 'bar' });

    assert.instanceOf(result, Object);
    assert.instanceOf(result.promise, Promise);
    assert.typeOf(result.returnValue, 'object');
    assert.equal(result.returnValue.a, 5);
    assert.equal(result.returnValue.param1, 'bar');
    assert.equal(result.returnValue.s, 'foo');
    assert.typeOf(result.returnValue.cancel, 'function');
    assert.equal(await result.promise, 3);
  });
});
