import { promisifyTypeField } from '../promisifyTypeField';
import { promisifyTypeMethod } from '../promisifyTypeMethod';

/**
 * Wraps a asynchronous methods of object in Promise by scheme
 *
 * @param {import('../../../types').ObjectValue} objValue object whose fields and methods must be promised
 * @param {import('../../../types').Scheme} scheme scheme of fields and methods of object
 * @returns {import('../../../types').ObjectValue} object whose fields and methods have been promised
 */
export function promisifyObjectValue(objValue, scheme) {
  const resultObject = {};
  for (const key in scheme) {
    const fieldScheme = scheme[key];
    if (!(key in objValue)) {
      continue;
    }
    switch (fieldScheme.type) {
    case 'field':
      resultObject[key] = promisifyTypeField(objValue[key], fieldScheme);
      break;
    case 'method':
      resultObject[key] = promisifyTypeMethod(
        key,
        objValue[key].bind(objValue),
        fieldScheme
      );
      break;
    }
  }
  return resultObject;
}
