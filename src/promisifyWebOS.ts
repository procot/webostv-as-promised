import { PromisedRequestMethodReturnObject, promisifyRequest } from './promisifyRequest';
import { RequestCallback } from './types';

/**
 * Wraps a original asyncronous methods in `webOS` object or in nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webos/
 *
 * @param webOS `webOS` object
 * @returns promised `webOS` object
 */
export function promisifyWebOS(webOS: WebOS): WebOSPromised {
  const webOSPromised: WebOSPromised = Object.create(webOS);
  webOSPromised.deviceInfo = () => new Promise(resolve => webOS.deviceInfo(resolve));
  webOSPromised.fetchAppInfo = (path?: string) => new Promise(resolve => webOS.fetchAppInfo(resolve, path));
  webOSPromised.service.request = (uri: string, params?: ServiceRequestParamsPromised) => {
    const binded = webOS.service.request.bind(webOS.service, uri);
    return promisifyRequest(binded, true)(params);
  };

  return webOSPromised;
}

/**
 * The `WebOS` interface with promised methods
 */
export interface WebOSPromised extends Omit<WebOS, 'deviceInfo' | 'fetchAppInfo' | 'service'> {
  /**
   * Returns the device-specific information regarding the TV model,
   * OS version, SDK version, screen size, and resolution
   *
   * @returns JSON object containing the device information details
   */
  deviceInfo(): Promise<DeviceInfo>;

  /**
   * Returns the appinfo.json data of the caller app with a saved cache
   *
   * @param path An optional relative file path to read appinfo.json.
   * The file name (appinfo.json) must be included in the file path
   * - If your app is packaged into an IPK file, get the path using `fetchAppRootPath` method
   * - If your app is hosted by a server, the path will be the URL of the server
   * @returns The JSON object read from the app's appinfo.json file. If it is not found, undefined is returned.
   */
  fetchAppInfo(path?: string): Promise<ObjectValue | undefined>;

  readonly service: {
    /**
     * Creates and sends a service request to the system of the webOS TV
     *
     * @param uri
     * The service URI.
     * It accepts the normal service URI format, as well as the extended format with the service method included.
     *
     * @param params
     * Service request options.
     *
     * @returns Resulting request object. This object can be used to cancel subscriptions.
     */
    request(uri: string, params?: ServiceRequestParamsPromised): PromisedRequestMethodReturnObject<ServiceRequestReturn, any>;
  };
}

/**
 * `ServiceRequestParams` type without `onSuccess` and `onFailure` field
 */
export type ServiceRequestParamsPromised = Omit<ServiceRequestParams, RequestCallback>;
