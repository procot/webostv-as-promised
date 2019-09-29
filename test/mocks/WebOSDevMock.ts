import { methodWithHadlers } from '../mocks/method-with-hadlers';

export const APP = {
  BROWSER: 'browser'
};
export const DRM = {
  Error: { unknown: 0 },
  Type: { type: 'type' }
};
export const LAUNCH_PARAMS = { content: 'uri' };

export class WebOSDevMock {
  APP = APP;
  DRM = DRM;
  launch = methodWithHadlers();

  launchParams = () => LAUNCH_PARAMS;

  LGUDID = methodWithHadlers();

  connection = {
    getStatus: methodWithHadlers()
  }

  drmAgent = () => ({});
}
