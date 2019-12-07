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
 * @param {string} methodName name of original method
 * @param {import('../../types').Callback} methodValue original method from object
 * @param {import('../../types').SchemeArg[]} argsFromScheme scheme of method arguments
 * @param {import('../../types').Callback} [mapAfterCallback] mapAfter callback from scheme
 * @returns {import('../../types').ObjectValue}
 */
export function promisifyTypeMethod(methodName, methodValue, argsFromScheme, mapAfterCallback = arg => arg) {
  const shouldPromised = argsFromScheme.some(getIsArgumentCallback);
  if (shouldPromised) {
    return (...args) => {
      const resultObject = {};
      resultObject.callResult = new Promise((resolve, reject) => {
        const finalArgs = argsFromScheme.map(argFromScheme => {
          const getFinalArg = schemeArgTypeToExternalArgValueMap[argFromScheme.type];
          return getFinalArg(
            args,
            res => resolve(mapAfterCallback(res)),
            errObj => reject(`Error execution ${methodName}: ${errObj.errorCode}.${errObj.errorText}`)
          );
        });
        resultObject.callReturned = methodValue(...finalArgs);
      });
      return resultObject;
    };
  } else {
    return (...args) => mapAfterCallback(methodValue(...args));
  }
}
