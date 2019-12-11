import { expect } from 'chai';
import { promisifyObjectValue } from './';
import { webOSScheme } from '../../schemes/webOSScheme';
import sinon from 'sinon';


describe('promisifyObjectValue()', () => {
  it('should save field value as is', () => {
    const obj = {
      libVersion: '1.0.0'
    };

    const promised = promisifyObjectValue(obj, webOSScheme);
    expect(promised.libVersion).to.equal('1.0.0');
  });

  it('should save method as is', () => {
    const obj = {
      fetchAppId: () => 'appId'
    };

    const promised = promisifyObjectValue(obj, webOSScheme);
    expect(promised.fetchAppId()).to.equal('appId');
  });

  it('should save method as is in field value', () => {
    const obj = {
      keyboard: { isShowing: () => true }
    };

    const promised = promisifyObjectValue(obj, webOSScheme);
    expect(promised.keyboard.isShowing()).to.be.true;
  });

  it('should promisify method with one callback in arguments', async () => {
    const obj = {
      deviceInfo: sinon.spy(callback => { setTimeout(callback.bind(null, 'deviceInfo'), 10); })
    };
    const originalMethod = obj.deviceInfo;

    const promised = promisifyObjectValue(obj, webOSScheme);
    expect(promised.deviceInfo).to.not.equal(originalMethod);
    const result = promised.deviceInfo();
    expect(originalMethod.called).to.be.true;
    expect(result.result).to.undefined;
    expect(await result.promise).to.equal('deviceInfo');
  });

  it('should promisify method with one plain value and one callback in arguments', async () => {
    const obj = {
      fetchAppInfo: sinon.spy((callback, arg) => { setTimeout(callback.bind(null, arg), 10); })
    };
    const originalMethod = obj.fetchAppInfo;

    const promised = promisifyObjectValue(obj, webOSScheme);
    expect(promised.fetchAppInfo).to.not.equal(originalMethod);
    const result = promised.fetchAppInfo('path');
    expect(originalMethod.called).to.be.true;
    expect(result.result).to.undefined;
    expect(await result.promise).to.equal('path');
  });

  it('should promisify method with callbacks in object in arguments', async () => {
    const obj = {
      service: {
        request: sinon.spy((uri, { onSuccess }) => { setTimeout(onSuccess.bind(null, uri), 10); })
      }
    };
    const originalMethod = obj.service.request;

    const promised = promisifyObjectValue(obj, webOSScheme);
    expect(promised.service.request).to.not.equal(originalMethod);
    const result = promised.service.request('uri');
    expect(originalMethod.called).to.be.true;
    expect(result.result).to.undefined;
    expect(await result.promise).to.equal('uri');
  });

  it('method mapAfter from scheme should be called if it is not undefined', () => {
    const obj = {
      method: sinon.spy(() => 'result')
    };
    const scheme = {
      method: {
        type: 'method',
        mapAfter: sinon.spy(res => res)
      }
    };

    const promised = promisifyObjectValue(obj, scheme);
    promised.method();
    expect(scheme.method.mapAfter.called).to.be.true;
    expect(scheme.method.mapAfter.calledWith('result')).to.be.true;
  });
});
