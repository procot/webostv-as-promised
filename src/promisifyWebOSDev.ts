/// <reference types="@procot/webostv/webOSTV-dev" />

import { DRMAgentPromised, promisifyDrmAgent } from './promisifyDrmAgent';
import { RequestCallback } from './types';
import { promisifyRequest } from './promisifyRequest';

/**
 * Wraps a original asyncronous methods in `webOSDev` object or nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webosdev/
 *
 * @param webOSDev `webOSDev` object
 * @returns promised `webOSDev` object
 */
export function promisifyWebOSDev(webOSDev: WebOSDev): WebOSDevPromised {
  const webOSDevPromised: WebOSDevPromised = Object.create(webOSDev);

  Object.defineProperties(webOSDevPromised, {
    launch: { value: promisifyRequest(webOSDev.launch.bind(webOSDev)) },
    LGUDID: { value: promisifyRequest(webOSDev.LGUDID.bind(webOSDev)) },
    drmAgent: { value: (type: string) => promisifyDrmAgent(webOSDev.drmAgent(type)) }
  });

  Object.defineProperty(webOSDevPromised.connection, 'getStatus', {
    value: promisifyRequest(webOSDev.connection.getStatus.bind(webOSDev.connection))
  });

  return webOSDevPromised;
}

/**
 * `LaunchParameters` type without `onSuccess` and `onFailure` field
 */
export type LaunchParametersPromised = Omit<LaunchParameters, RequestCallback>;
/**
 * `GetConnectionStatusParameters` type without `onSuccess` and `onFailure` field
 */
export type GetConnectionStatusParametersPromised = Omit<GetConnectionStatusParameters, RequestCallback>;

/**
 * The `WebOSDev` interface with promised methods
 */
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
