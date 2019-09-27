import { promisifyMethod } from './promisify';

import {
  DRMType,
  GetRightsErrorResponse,
  IsLoadedResponse,
  LoadResponse,
  SendDrmMessageParams,
  SendDrmMessageResponse,
  DRMError
} from '../types';

export class DRMAgentWrapper {
  constructor(private drmAgent: any) {}

  /**
   * Returns a client ID of DRM.
   */
  getClientId(): string {
    return this.drmAgent.getClientId();
  }

  /**
   * Returns a DRM type to be set.
   */
  getDrmType(): DRMType[keyof DRMType] {
    return this.drmAgent.getDrmType();
  }

  /**
   * Returns an error code from the DRM service.
   */
  getErrorCode(): DRMError[keyof DRMError] {
    return this.drmAgent.getErrorCode();
  }

  /**
   * Returns a text represented by an error from the DRM service.
   */
  getErrorText(): string {
    return this.drmAgent.getErrorText();
  }

  /**
   * Returns error information when an error of the DRM license occurs during content playback.
   * This method is supported in the following DRM type only:
   * - PlayReady
   */
  getRightsError() {
    return promisifyMethod<GetRightsErrorResponse>(this.drmAgent.getRightsError.bind(this.drmAgent))
      .then(res => {
        const { returnValue, subscribed, errorCode, errorText } = res;
        if (returnValue) {
          return { subscribed };
        }

        throw new Error(`${errorCode}.${errorText}`);
      });
  }

  /**
   * Checks whether a DRM client that corresponds to given application ID exists.
   */
  isLoaded() {
    return promisifyMethod<IsLoadedResponse>(this.drmAgent.isLoaded.bind(this.drmAgent));
  }

  /**
   * Creates a client instance for a certain type of DRM.
   * The DRM type is specified when a DRM agent is created.
   */
  load() {
    return promisifyMethod<LoadResponse>(this.drmAgent.load.bind(this.drmAgent));
  }

  /**
   * Sends a DRM message to a DRM service.
   * After receiving the message, the DRM service starts to parse the message and perform the DRM operation.
   */
  sendDrmMessage(params: SendDrmMessageParams = { msg: '' }) {
    return promisifyMethod<SendDrmMessageResponse>(this.drmAgent.sendDrmMessage.bind(this.drmAgent), params);
  }

  /**
   * Removes a DRM client instance and deallocates relevant resources.
   */
  unload() {
    return promisifyMethod<{}>(this.drmAgent.unload.bind(this.drmAgent));
  }
}
