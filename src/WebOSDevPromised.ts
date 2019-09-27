import { DRMAgentWrapper } from './DRMAgentWrapper';
import { promisifyMethod } from './promisify';

import {
  DRMError,
  DRMType,
  LaunchParameters,
  GetConnectionStatusParameters,
  ConnectionStatus
} from '../types';

/**
 * Промисная реализация API webOS (http://webostv.developer.lge.com/api/webostvjs/webosdev)
 * Все типы взяты из документации
 */

export class WebOSDevPromised {
  private webOSDev: any;

  constructor() {
    require('../lib/webOSTV-dev');
    this.webOSDev = window.webOSDev;
  }

  /**
   * A member representing the list of built-in apps on the webOS TV opened to external developers.
   */
  get APP() {
    return this.webOSDev.APP as {
      /** The built-in browser on the webOS TV */
      BROWSER: string;
    };
  }

  /**
   * An object containing properties that represent the DRM error number and the DRM type.
   */
  get DRM() {
    return this.webOSDev.DRM as {
      /** The error number from DRM service */
      Error: DRMError;
      /** The type of DRM */
      Type: DRMType;
    };
  }

  /**
   * Returns DRMAgent instance of a specific DRM type.
   * @param type The DRM type to be set to the DRMAgent instance
   */
  drmAgent(type: DRMType[keyof DRMType]) {
    return new DRMAgentWrapper(this.webOSDev.drmAgent(type));
  }

  /**
   * Launches an application with parameters.
   * @param parameters The JSON object containing an app ID, parameters
   */
  launch(parameters: LaunchParameters) {
    return promisifyMethod<void, undefined>(this.webOSDev.launch, parameters);
  }

  /**
   * Passes parameters of an app launched by the webOSDev.launch method.
   */
  launchParams(): object {
    return this.webOSDev.launchParams();
  }

  /**
   * Returns a device ID provided by the webOS TV since webOS TV 3.0.
   */
  LGUDID() {
    type SuccessResponse = {
      /** LG unique device ID. */
      id: string;
    };
    return promisifyMethod<SuccessResponse, undefined>(this.webOSDev.LGUDID);
  }

  /**
   * Returns the network connection state.
   */
  getConnectionStatus(parameters: GetConnectionStatusParameters) {
    return promisifyMethod<ConnectionStatus, undefined>(this.webOSDev.connection.getStatus, parameters);
  }
}
