import { DRMError, DRMType } from './drm';
import { LaunchParameters } from './LaunchParameters';
import { ConnectionStatus, GetConnectionStatusParameters } from './ConnectionStatus';
import { DRMAgentPromised } from './DrmAgentPromised';
import { AsyncMethodReturnType, ObjectValue } from './common';
import { LGUDIDResponse } from './LGUDIDResponse';

export interface WebOSDevPromised {
  /**
   * A member representing the list of built-in apps on the webOS TV opened to external developers.
   */
  readonly APP: {
    /** The built-in browser on the webOS TV */
    BROWSER: string;
  };

  /**
   * An object containing properties that represent the DRM error number and the DRM type.
   */
  readonly DRM: {
    /** The error number from DRM service */
    Error: DRMError;
    /** The type of DRM */
    Type: DRMType;
  };

  /**
   * Returns DRMAgent instance of a specific DRM type.
   * @param type The DRM type to be set to the DRMAgent instance
   */
  drmAgent(type: DRMType[keyof DRMType]): DRMAgentPromised;

  /**
   * Launches an application with parameters.
   * @param parameters The JSON object containing an app ID, parameters
   */
  launch(parameters: LaunchParameters): AsyncMethodReturnType<void>;

  /**
   * Passes parameters of an app launched by the webOSDev.launch method.
   */
  launchParams<T extends ObjectValue = ObjectValue>(): T;

  /**
   * Returns a device ID provided by the webOS TV since webOS TV 3.0.
   */
  LGUDID(): AsyncMethodReturnType<LGUDIDResponse>;

  readonly connection: {
    /**
     * Returns the network connection state.
     */
    getStatus(parameters: GetConnectionStatusParameters): AsyncMethodReturnType<ConnectionStatus>;
  };
}
