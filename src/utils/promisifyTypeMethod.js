import { getIsArgumentCallback } from './getIsArgumentCallback';

/**
 * Maps type of argument from scheme to method which return the argument value for original method
 */
const schemeArgTypeToExternalArgValueMap = {
  value: externalArgs => externalArgs.shift(),
  successCallback: (_, resolveCallback) => resolveCallback,
  errorCallback: (_, __, rejectCallback) => rejectCallback,
  objectWithCallback: (externalArg, resolveCallback, rejectCallback) => Object.assign(externalArg || {}, { onSuccess: resolveCallback, onFailure: rejectCallback })
};

/**
 * Wraps a method of object in Promise if it is asyncronous method by scheme
 *
 * @param {import('../../types').ObjectValue} objValue object whose method must be promised if it needed
 * @param {string} fieldName method name
 * @param {import('../../types').SchemeArg[]} argsFromScheme scheme of method arguments
 * @param {import('../../types').Callback} [mapAfterCallback] mapAfter callback from scheme
 * @returns {import('../../types').ObjectValue}
 */
export function promisifyTypeMethod(objValue, fieldName, argsFromScheme, mapAfterCallback) {
  const originalMethod = objValue[fieldName];
  const shouldPromised = argsFromScheme.some(getIsArgumentCallback);
  if (shouldPromised) {
    objValue[fieldName] = (...args) => {
      const resultObject = {};
      resultObject.callResult = new Promise((resolve, reject) => {
        const finalArgs = argsFromScheme.map(argFromScheme => {
          const getFinalArg = schemeArgTypeToExternalArgValueMap[argFromScheme.type];
          return getFinalArg(args, resolve, reject);
        });
        resultObject.callReturned = originalMethod.apply(objValue, finalArgs);
      });
      return resultObject;
    };
  } else if (mapAfterCallback) {
    objValue[fieldName] = (...args) => mapAfterCallback(originalMethod.apply(objValue, args));
  }
  return objValue;
}
