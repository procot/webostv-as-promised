import { expect } from 'chai';import { getIsArgumentCallback } from './';


describe('getIsArgumentCallback()', () => {
  it('should return true because argument is callback', () => {
    const result = getIsArgumentCallback({ type: 'successCallback' });
    expect(result).to.be.true;
  });

  it('should return true because argument is object with callbacks', () => {
    const result = getIsArgumentCallback({ type: 'objectWithCallback' });
    expect(result).to.be.true;
  });

  it('should return false because argument isn\'t callback or object with callbacks', () => {
    const result = getIsArgumentCallback({ type: 'value' });
    expect(result).to.be.false;
  });
});
