import { methodWithHadlers } from '../mocks/method-with-hadlers';

export const CLIENT_ID = '1234567890';
export const DRM_TYPE = 'playready';
export const DRM_ERROR_CODE = 0;
export const DRM_ERROR_TEXT = 'error';
export const SUBSCRIBED = true;

export class DRMAgentMock {
  getClientId = () => CLIENT_ID;

  getDrmType = () => DRM_TYPE;

  getErrorCode = () => DRM_ERROR_CODE;

  getErrorText = () => DRM_ERROR_TEXT;

  getRightsError = methodWithHadlers(true, { returnValue: true, subscribed: SUBSCRIBED });

  isLoaded = methodWithHadlers();

  load = methodWithHadlers();

  sendDrmMessage = methodWithHadlers();

  unload = methodWithHadlers();
}
