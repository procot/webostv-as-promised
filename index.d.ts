import '@procot/webostv';

/**
 * Wraps a original asyncronous methods in `webOS` object or in nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webos/
 *
 * @param webOS `webOS` object
 * @returns promised `webOS` object
 */
export function promisifyWebOS(webOS: WebOS): WebOSPromised;

/**
 * Wraps a original asyncronous methods in `webOSDev` object or nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webosdev/
 *
 * @param webOSDev `webOSDev` object
 * @returns promised `webOSDev` object
 */
export function promisifyWebOSDev(webOSDev: WebOSDev): WebOSDevPromised;

/**
 * Wraps a original asyncronous methods in instance `DRMAgent` object or nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webosdev/drmagent/
 *
 * @param drmAgent instance of `DRMAgent`
 * @returns promised `DRMAgent` instance
 */
export function promisifyDrmAgent(drmAgent: DRMAgent): DRMAgentPromised;

/**
 * Wraps a method for returning the promise
 * @param fn a method for wrapping
 * @returns wrapped method
 */
export function promisifyRequest<
  Result extends any,
  Params extends RequestParams<Result>,
>(fn: (params?: Params) => any): Promise<Result>;

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
    request(uri: string, params?: ServiceRequestParamsPromised): {
      /**
       *  Return object of method
       */
      return: ServiceRequestReturn;
      /**
       * Method execution promise
       */
      promise: Promise<any>;
    }
  };
}

export type RequestCallback = 'onSuccess' | 'onFailure';
export type ServiceRequestParamsPromised = Omit<ServiceRequestParams, RequestCallback>;
export type LaunchParametersPromised = Omit<LaunchParameters, RequestCallback>;
export type GetConnectionStatusParametersPromised = Omit<GetConnectionStatusParameters, RequestCallback>;
export type SendDrmMessageParamsPromised = Omit<SendDrmMessageParams, RequestCallback>;

export interface WebOSDevPromised extends Omit<WebOSDev, 'launch' | 'LGUDID' | 'connection' | 'drmAgent'> {
  /**
   * Launches an application with parameters.
   * @param parameters The JSON object containing an app ID, parameters
   */
  launch(params: LaunchParametersPromised): Promise<void>;
  /**
   * Returns a device ID provided by the webOS TV since webOS TV 3.0.
   */
  LGUDID(): Promise<LGUDIDResponse>;

  readonly connection: {
    /**
     * Returns the network connection state.
     */
    getStatus(params: GetConnectionStatusParametersPromised): Promise<ConnectionStatus>;
  };

  /**
   * Returns DRMAgent instance of a specific DRM type.
   * @param type The DRM type to be set to the DRMAgent instance.
   * The value of the DRM type must be taken from `DRM.Type` field (`DRM.Type.PLAYREADY` or `DRM.Type.WIDEVINE`)
   *
   * @example
   * const drmType = webOSDevPromised.DRM.Type;
   * const drmAgent = webOSDevPromised.drmAgent(drmType);
   */
  drmAgent(type: DRMType[keyof DRMType]): DRMAgentPromised;
}

export interface DRMAgentPromised extends Omit<DRMAgent, 'getRightsError' | 'isLoaded' | 'load' | 'sendDrmMessage' | 'unload'> {
  /**
   * Returns error information when an error of the DRM license occurs during content playback.
   * This method is supported in the following DRM type only:
   * - PlayReady
   */
  getRightsError(): Promise<GetRightsErrorResponse>;
  /**
   * Checks whether a DRM client that corresponds to given application ID exists.
   */
  isLoaded(): Promise<IsLoadedResponse>;
  /**
   * Creates a client instance for a certain type of DRM.
   * The DRM type is specified when a DRM agent is created.
   */
  load(): Promise<LoadResponse>;
  /**
   * Sends a DRM message to a DRM service.
   * After receiving the message, the DRM service starts to parse the message and perform the DRM operation.
   */
  sendDrmMessage(params?: SendDrmMessageParamsPromised): Promise<SendDrmMessageResponse>;
  /**
   * Removes a DRM client instance and deallocates relevant resources.
   */
  unload(): Promise<ObjectValue>;
}
