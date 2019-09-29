import { assert } from 'chai';

import { promisifyMethod } from '../../src/promisify';

import { methodWithHadlers, ERROR_CODE, ERROR_TEXT, IReturn } from '../mocks/method-with-hadlers';

const PARAMETERS = { param1: 1 };
const ARGS = [ 'uri' ];

describe('promisify method with handlers', () => {
  it('should resolve promise', () => {
    return promisifyMethod<IReturn, undefined>(methodWithHadlers(), PARAMETERS, ...ARGS)
      .then(value => {
        const { parameters, args, result } = value;
        assert.deepEqual(parameters, PARAMETERS);
        assert.deepEqual(args, ARGS);
        assert.equal(result, undefined);
      });
  });

  it('should reject promise', () => {
    return promisifyMethod<IReturn>(methodWithHadlers(false), PARAMETERS, ...ARGS)
      .catch((err: Error) => {
        assert.equal(err.message, `${ERROR_CODE}.${ERROR_TEXT}`);
      });
  });
});
