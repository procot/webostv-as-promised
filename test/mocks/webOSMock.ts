import { methodWithHadlers } from './method-with-hadlers';

type Callback = (...args: any) => any;

export const DEVICE_INFO = {
  modelName: 'modelName',
  version: 'version'
};

export const APP_ID = 'appid';
export const APP_INFO = { name: 'name' };
export const APP_ROOT_PATH = '/app/root/path';
export const SYSTEM_INFO = { country: 'ru' };
export const KEYBOARD_IS_SHOWING = true;

export class WebOSMock {
  libVersion = 'libVersion';
  platform = { tv: true };
  keyboard = { isShowing: () => KEYBOARD_IS_SHOWING };
  platformCallCount = 0;

  deviceInfo(callback: Callback) {
    setTimeout(() => callback(DEVICE_INFO), 0);
  }

  fetchAppId = () => APP_ID;

  fetchAppInfo(callback: Callback) {
    setTimeout(() => callback(APP_INFO));
  }

  fetchAppRootPath = () => APP_ROOT_PATH;

  systemInfo = () => SYSTEM_INFO;

  platformBack() {
    this.platformCallCount++;
  }

  service = {
    request: methodWithHadlers(true)
  };
}
