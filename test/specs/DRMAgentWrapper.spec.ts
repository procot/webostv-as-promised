import { assert } from 'chai';

import { DRMAgentWrapper } from '../../src/DRMAgentWrapper';
import {
  DRMAgentMock,
  CLIENT_ID,
  DRM_TYPE,
  DRM_ERROR_CODE,
  DRM_ERROR_TEXT,
  SUBSCRIBED
} from '../mocks/DRMAgentMock';

const drmAgent = new DRMAgentWrapper(new DRMAgentMock);

describe('DRMAgentWrapper', () => {
  it('getClientId()', () => {
    assert.equal(drmAgent.getClientId(), CLIENT_ID);
  });

  it('getDrmType()', () => {
    assert.equal(drmAgent.getDrmType(), DRM_TYPE);
  });

  it('getErrorCode()', () => {
    assert.equal(drmAgent.getErrorCode(), DRM_ERROR_CODE);
  });

  it('getErrorText()', () => {
    assert.equal(drmAgent.getErrorText(), DRM_ERROR_TEXT);
  });

  it('getRightsError()', async () => {
    assert.deepEqual(await drmAgent.getRightsError(), { subscribed: SUBSCRIBED });
  });

  it('isLoaded()', async () => {
    const { parameters, args } = await drmAgent.isLoaded() as any;
    assert.deepEqual(parameters, {});
    assert.deepEqual(args, []);
  });

  it('load()', async () => {
    const { parameters, args } = await drmAgent.load() as any;
    assert.deepEqual(parameters, {});
    assert.deepEqual(args, []);
  });

  it('sendDrmMessage()', async () => {
    const parameters = { msg: 'msg' };
    const { parameters: reservedParameters, args } = await drmAgent.sendDrmMessage(parameters) as any;
    assert.deepEqual(parameters, reservedParameters);
    assert.deepEqual(args, []);
  });

  it('unload()', async () => {
    const { parameters, args } = await drmAgent.unload() as any;
    assert.deepEqual(parameters, {});
    assert.deepEqual(args, []);
  });
});
