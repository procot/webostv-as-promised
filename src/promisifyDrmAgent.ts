/// <reference types="@procot/webostv/webOSTV-dev/drmAgent" />

import { RequestCallback } from './types';
import { promisifyRequest } from './promisifyRequest';

/**
 * Wraps a original asyncronous methods in instance `DRMAgent` object or nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webosdev/drmagent/
 *
 * @param drmAgent instance of `DRMAgent`
 * @returns promised `DRMAgent` instance
 */
export function promisifyDrmAgent<
  TDrmType extends WebOSTV.DRMType[keyof WebOSTV.DRMType] = WebOSTV.DRMType[keyof WebOSTV.DRMType]
>(drmAgent: WebOSTV.DRMAgent<TDrmType>): DRMAgentPromised<TDrmType> {
  const drmAgentPromised: DRMAgentPromised<TDrmType> = Object.create(drmAgent);

  Object.defineProperties(drmAgentPromised, {
    getRightsError: { value: promisifyRequest(drmAgent.getRightsError.bind(drmAgent)) },
    isLoaded: { value: promisifyRequest(drmAgent.isLoaded.bind(drmAgent)) },
    load: { value: promisifyRequest(drmAgent.load.bind(drmAgent)) },
    sendDrmMessage: { value: promisifyRequest(drmAgent.sendDrmMessage.bind(drmAgent)) },
    unload: { value: promisifyRequest(drmAgent.unload.bind(drmAgent)) }
  });

  return drmAgentPromised;
}

/**
 * The `DRMAgent` interface with promised methods
 */
export interface DRMAgentPromised<
  TDrmType extends WebOSTV.DRMType[keyof WebOSTV.DRMType] = WebOSTV.DRMType[keyof WebOSTV.DRMType]
> extends Omit<WebOSTV.DRMAgent<TDrmType>, 'getRightsError' | 'isLoaded' | 'load' | 'sendDrmMessage' | 'unload'> {
  /**
   * Returns error information when an error of the DRM license occurs during content playback.
   * This method is supported in the following DRM type only:
   * - PlayReady
   */
  getRightsError(): Promise<WebOSTV.GetRightsErrorResponse>;
  /**
   * Checks whether a DRM client that corresponds to given application ID exists.
   */
  isLoaded(): Promise<WebOSTV.IsLoadedResponse<TDrmType>>;
  /**
   * Creates a client instance for a certain type of DRM.
   * The DRM type is specified when a DRM agent is created.
   */
  load(): Promise<WebOSTV.LoadResponse>;
  /**
   * Sends a DRM message to a DRM service.
   * After receiving the message, the DRM service starts to parse the message and perform the DRM operation.
   */
  sendDrmMessage(params?: SendDrmMessageParamsPromised): Promise<WebOSTV.SendDrmMessageResponse>;
  /**
   * Removes a DRM client instance and deallocates relevant resources.
   */
  unload(): Promise<{}>;
}

/**
 * The `SendDrmMessageParams` type without `onSuccess` and `onFailure` field
 */
export type SendDrmMessageParamsPromised = Omit<WebOSTV.SendDrmMessageParams, RequestCallback>;
