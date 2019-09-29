import { assert } from 'chai';
import proxyquire from 'proxyquire';

import {
  WebOSMock,
  DEVICE_INFO,
  APP_ID,
  APP_INFO,
  APP_ROOT_PATH,
  SYSTEM_INFO,
  KEYBOARD_IS_SHOWING
} from '../mocks/WebOSMock';
import { IReturn } from '../mocks/method-with-hadlers';

(global as any).window = {};

const webOSMock = new WebOSMock;

const WebOSPromised = proxyquire('../../src/WebOSPromised', {
  '../lib/webOSTV': { window: { webOS: webOSMock } }
}).WebOSPromised as typeof import('../../src/WebOSPromised').WebOSPromised;

describe('webOS-promised', () => {
  it('libVersion', () => {
    const webOS = new WebOSPromised;
    assert.equal(webOS.libVersion, webOSMock.libVersion);
  });

  it('platform', () => {
    const webOS = new WebOSPromised;
    assert.deepEqual(webOS.platform, webOSMock.platform);
  });

  it('deviceInfo()', async () => {
    const webOS = new WebOSPromised;
    const info = await webOS.deviceInfo();
    assert.deepEqual(info, DEVICE_INFO);
  });

  it('fetchAppId()', () => {
    const webOS = new WebOSPromised;
    assert.equal(webOS.fetchAppId(), APP_ID);
  });

  it('fetchAppInfo()', async () => {
    const webOS = new WebOSPromised;
    const info = await webOS.fetchAppInfo();
    assert.deepEqual(info, APP_INFO);
  })

  it('fetchAppRootPath()', () => {
    const webOS = new WebOSPromised;
    assert.equal(webOS.fetchAppRootPath(), APP_ROOT_PATH);
  });

  it('systemInfo()', () => {
    const webOS = new WebOSPromised;
    assert.deepEqual(webOS.systemInfo(), SYSTEM_INFO);
  });

  it('keyboardIsShowing()', () => {
    const webOS = new WebOSPromised;
    assert.equal(webOS.keyboardIsShowing(), KEYBOARD_IS_SHOWING);
  });

  it('platformBack()', () => {
    const webOS = new WebOSPromised;
    webOS.platformBack();
    assert.equal(webOSMock.platformCallCount, 1);
  });

  it('serviceRequest()', async () => {
    const uri = 'uri';
    const params = { method: 'record' };
    const webOS = new WebOSPromised;
    const res = await webOS.serviceRequest<IReturn>('uri', params);
    assert.deepEqual(res.parameters, params);
    assert.deepEqual(res.args, [ uri ]);
  });
});
