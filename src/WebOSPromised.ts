const { window: { webOS } } = require('../lib/webOSTV.js');

import {
  AppInfo,
  IDeviceInfo,
  IServiceRequestParams,
  ISystemInfo,
  IServiceRequestReturn
} from '../types';
import { promisifyMethod } from './promisify';

/**
 * Промисная реализация API webOS (http://webostv.developer.lge.com/api/webostvjs/webos)
 * Все типы взяты из документации
 */

export class WebOSPromised {
  private webOS: typeof window.webOS;

  constructor() {
    this.webOS = webOS;
  }

  /**
   * A member representing the build version of the webOSTV.js library
   */
  get libVersion(): string {
    return this.webOS.libVersion;
  }

  /**
   * A member representing the platform identification of webOS variants
   */
  get platform(): { tv: boolean } {
    return this.webOS.platform;
  }

  /**
   * Returns the device-specific information regarding the TV model, OS version, SDK version, screen size, and resolution
   */
  deviceInfo() {
    return new Promise<IDeviceInfo>(resolve => {
      this.webOS.deviceInfo(resolve);
    });
  }

  /**
   * Returns an app ID of an app calling this method
   */
  fetchAppId(): string {
    return this.webOS.fetchAppId();
  }

  /**
   * Returns the appinfo.json data of the caller app with a saved cache
   * @param path An optional relative file path to read appinfo.json. The file name (appinfo.json) must be included in the file path
   * - If your app is packaged into an IPK file, get the path using  fetchAppRootPath method
   * - If your app is hosted by a server, the path will be the URL of the server
   */
  fetchAppInfo(path?: string) {
    return new Promise<AppInfo>(resolve => {
      this.webOS.fetchAppInfo(resolve, path);
    });
  }

  /**
   * Returns the full URI path of the caller app
   */
  fetchAppRootPath(): string {
    return this.webOS.fetchAppRootPath();
  }

  /**
   * Emulates the back key of the remote controller to move backward 1 level
   */
  platformBack(): void {
    return this.webOS.platformBack();
  }

  /**
   * Returns the system-specific information regarding country, service country, and timezone
   */
  systemInfo(): ISystemInfo {
    return this.webOS.systemInfo();
  }

  /**
   * Indicates whether the virtual keyboard is displayed or hidden
   * - true: the virtual keyboard is displayed
   * - false: the virtual keyboard is hidden
   */
  keyboardIsShowing(): boolean {
    return this.webOS.keyboard.isShowing();
  }

  /**
   * Creates and sends a service request to the system of the webOS TV
   *
   * @param uri
   * The service URI.
   * It accepts the normal service URI format, as well as the extended format with the service method included.
   *
   * @param params
   * Service request options.
   */
  serviceRequest<T = any>(uri: string, params: IServiceRequestParams = {}) {
    return promisifyMethod<T, IServiceRequestReturn>(this.webOS.service.request, params, uri);
  }
}
