import { promisifyObjectValue } from './promisifyObjectValue';

/**
 * Wraps a field value of object in Promise if it needed by scheme
 *
 * @param {any} valueFromObject value from object
 * @param {import('../../types').Scheme} valueFromScheme scheme of field value
 * @param {import('../../types').Callback} [mapAfterCallback] mapAfter callback from scheme
 * @returns {any}
 */
export function promisifyTypeField(valueFromObject, valueFromScheme, mapAfterCallback = arg => arg) {
  let result = valueFromObject;
  if (typeof valueFromScheme === 'object') {
    result = promisifyObjectValue(valueFromObject, valueFromScheme);
  }
  return mapAfterCallback(result);
}
