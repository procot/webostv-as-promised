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
export function promisifyDrmAgent(drmAgent: DRMAgent): DRMAgentPromised {
  const drmAgentPromised: DRMAgentPromised = Object.assign(drmAgent);

  drmAgentPromised.getRightsError = promisifyRequest(drmAgent.getRightsError.bind(drmAgent));
  drmAgentPromised.isLoaded = promisifyRequest(drmAgent.isLoaded.bind(drmAgent));
  drmAgentPromised.load = promisifyRequest(drmAgent.load.bind(drmAgent));
  drmAgentPromised.sendDrmMessage = promisifyRequest(drmAgent.sendDrmMessage.bind(drmAgent));
  drmAgentPromised.unload = promisifyRequest(drmAgent.unload.bind(drmAgent));

  return drmAgentPromised;
}

/**
 * The `SendDrmMessageParams` type without `onSuccess` and `onFailure` field
 */
export type SendDrmMessageParamsPromised = Omit<SendDrmMessageParams, RequestCallback>;

/**
 * The `DRMAgent` interface with promised methods
 */
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
