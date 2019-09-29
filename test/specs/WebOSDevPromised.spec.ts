import { assert } from 'chai';
import proxyquire from 'proxyquire';

import {
  WebOSDevMock,
  APP,
  DRM,
  LAUNCH_PARAMS
} from '../mocks/WebOSDevMock';
import { DRMAgentWrapper } from '../../src/DRMAgentWrapper';

(global as any).window = {};

const webOSDevMock = new WebOSDevMock;

const WebOSDevPromised = proxyquire('../../src/WebOSDevPromised', {
  '../lib/webOSTV-dev': { window: { webOSDev: webOSDevMock } }
}).WebOSDevPromised as typeof import('../../src/WebOSDevPromised').WebOSDevPromised;

describe('WebOSDevPromised', () => {
  it('APP', () => {
    const webOSDev = new WebOSDevPromised;
    assert.deepEqual(webOSDev.APP, APP);
  });

  it('DRM', () => {
    const webOSDev = new WebOSDevPromised;
    assert.deepEqual(webOSDev.DRM as any, DRM);
  });

  it('launch()', async () => {
    const parameters = {
      id: 'id',
      params: { param1: 'param1' }
    };
    const webOSDev = new WebOSDevPromised;
    const { parameters: reservedParameters, args, result } = await webOSDev.launch(parameters) as any;
    assert.deepEqual(reservedParameters, parameters);
    assert.deepEqual(args, []);
    assert.deepEqual(result, undefined);
  });

  it('launchParams()', () => {
    const webOSDev = new WebOSDevPromised;
    assert.deepEqual(webOSDev.launchParams(), LAUNCH_PARAMS);
  });

  it('LGUDID()', async () => {
    const webOSDev = new WebOSDevPromised;
    const { result, args, parameters } = await webOSDev.LGUDID() as any;
    assert.deepEqual(result, undefined);
    assert.deepEqual(args, []);
    assert.deepEqual(parameters, {});
  });

  it('getConnectionStatus()', async () => {
    const webOSDev = new WebOSDevPromised;
    const parameters = { subscribe: true };
    const { parameters: reservedParameters, args, result } = await webOSDev.getConnectionStatus(parameters) as any;
    assert.deepEqual(result, undefined);
    assert.deepEqual(args, []);
    assert.deepEqual(reservedParameters, parameters);
  });

  it('drmAgent()', () => {
    const webOSDev = new WebOSDevPromised;
    const agent = webOSDev.drmAgent('type');
    assert.instanceOf(agent, DRMAgentWrapper);
  });
});
