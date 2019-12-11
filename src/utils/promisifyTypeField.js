import { promisifyObjectValue } from './promisifyObjectValue';

/**
 * Wraps a field value of object in Promise if it needed by scheme
 *
 * @param {any} fieldValue value from object
 * @param {import('../../types').SchemeField} fieldScheme scheme of field value
 * @param {import('../../types').Callback} [mapAfterCallback] mapAfter callback from scheme
 * @returns {any}
 */
export function promisifyTypeField(fieldValue, fieldScheme) {
  const valueScheme = fieldScheme.value;
  const mapAfterCallback = fieldScheme.mapAfter || (arg => arg);
  let result = fieldValue;
  if (typeof valueScheme === 'object') {
    result = promisifyObjectValue(fieldValue, valueScheme);
  }
  return mapAfterCallback(result);
}
