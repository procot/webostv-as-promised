import { promisifyObjectValue } from './promisifyObjectValue';

/**
 * Wraps a field value of object in Promise if it needed by scheme
 *
 * @param {import('../../types').ObjectValue} objValue object whose field's values must be promised
 * @param {string} fieldName field name of object which must be promised
 * @param {import('../../types').Scheme} valueFromScheme scheme of field value
 * @param {import('../../types').Callback} [mapAfterCallback] mapAfter callback from scheme
 * @returns {import('../../types').ObjectValue}
 */
export function promisifyTypeField(objValue, fieldName, valueFromScheme, mapAfterCallback) {
  if (typeof valueFromScheme === 'object') {
    objValue[fieldName] = promisifyObjectValue(objValue[fieldName], valueFromScheme);
  }
  if (mapAfterCallback) {
    objValue[fieldName] = mapAfterCallback(objValue[fieldName]);
  }
  return objValue;
}
