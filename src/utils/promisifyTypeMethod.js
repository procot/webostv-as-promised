import { getIsArgumentCallback } from './getIsArgumentCallback';

/**
 * Maps type of argument from scheme to method which return the argument value for original method
 */
const schemeArgTypeToExternalArgValueMap = {
  value: externalArgs => externalArgs.shift(),
  successCallback: (_, resolveCallback) => resolveCallback,
  errorCallback: (_, __, rejectCallback) => rejectCallback,
  objectWithCallback: (externalArgs, resolveCallback, rejectCallback) => Object.assign(externalArgs.shift() || {}, { onSuccess: resolveCallback, onFailure: rejectCallback })
};

/**
 * Wraps a method of object in Promise if it is asyncronous method by scheme
 *
 * @param {string} methodName name of original method
 * @param {import('../../types').Callback} methodValue original method from object
 * @param {import('../../types').SchemeField} methodScheme scheme of method arguments
 * @returns {import('../../types').Callback}
 */
export function promisifyTypeMethod(methodName, methodValue, methodScheme) {
  const argsScheme = methodScheme.args || [];
  const mapAfterCallback = methodScheme.mapAfter || (arg => arg);
  const shouldPromised = argsScheme.some(getIsArgumentCallback);
  if (shouldPromised) {
    return (...args) => {
      const resultObject = {};
      resultObject.promise = new Promise((resolve, reject) => {
        const finalArgs = argsScheme.map(argFromScheme => {
          const getFinalArg = schemeArgTypeToExternalArgValueMap[argFromScheme.type];
          return getFinalArg(
            args,
            res => resolve(mapAfterCallback(res)),
            errObj => reject(new Error(`Error execution ${methodName}: ${errObj.errorCode}.${errObj.errorText}`))
          );
        });
        resultObject.result = methodValue(...finalArgs);
      });
      return methodScheme.returnType === 'object' ? resultObject : resultObject.promise;
    };
  } else {
    return (...args) => mapAfterCallback(methodValue(...args));
  }
}
