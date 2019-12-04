import { DRMAgentPromised, ObjectValue, WebOSDevPromised, WebOSPromised } from './types';

export * from './types';

/**
 * Wraps a original asyncronous methods in `webOS` object or in nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webos/
 *
 * @param webOS `webOS` object
 * @returns promised `webOS` object
 */
export function promisifyWebOS(webOS: ObjectValue): WebOSPromised;

/**
 * Wraps a original asyncronous methods in `webOSDev` object or nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webosdev/
 *
 * @param webOSDev `webOSDev` object
 * @returns promised `webOSDev` object
 */
export function promisifyWebOSDev(webOSDev: ObjectValue): WebOSDevPromised;

/**
 * Wraps a original asyncronous methods in instance `DRMAgent` object or nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webosdev/drmagent/
 *
 * @param drmAgent instance of `DRMAgent`
 * @returns promised `DRMAgent` instance
 */
export function promisifyDrmAgent(drmAgent: ObjectValue): DRMAgentPromised;
