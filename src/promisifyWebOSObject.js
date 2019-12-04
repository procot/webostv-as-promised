import { drmAgentScheme } from './schemes/drmAgentScheme';
import { promisifyObjectValue } from './utils/promisifyObjectValue';
import { webOSDevScheme } from './schemes/webOSDevScheme';
import { webOSScheme } from './schemes/webOSScheme';

/**
 * Wraps a original asyncronous methods in `webOS` object or in nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webos/
 *
 * @param {import('../types').ObjectValue} webOS `webOS` object
 * @returns {import('../types').WebOSPromised} promised `webOS` object
 */
export function promisifyWebOS(webOS) {
  return promisifyObjectValue(webOS, webOSScheme);
}

/**
 * Wraps a original asyncronous methods in `webOSDev` object or nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webosdev/
 *
 * @param {import('../types').ObjectValue} webOSDev `webOSDev` object
 * @returns {import('../types').WebOSDevPromised} promised `webOSDev` object
 */
export function promisifyWebOSDev(webOSDev) {
  return promisifyObjectValue(webOSDev, webOSDevScheme);
}

/**
 * Wraps a original asyncronous methods in instance `DRMAgent` object or nested object in Promise
 *
 * http://webostv.developer.lge.com/api/webostvjs/webosdev/drmagent/
 *
 * @param {import('../types').ObjectValue} drmAgent instance of `DRMAgent`
 * @returns {import('../types').DRMAgentPromised} promised `DRMAgent` instance
 */
export function promisifyDrmAgent(drmAgent) {
  return promisifyObjectValue(drmAgent, drmAgentScheme);
}
