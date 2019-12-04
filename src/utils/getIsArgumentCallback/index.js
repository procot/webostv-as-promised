/**
 * Checks the argument is a callback by scheme
 *
 * @param {import('../../../types').SchemeArg} arg the argument value from scheme
 */
export const getIsArgumentCallback = arg => [ 'successCallback', 'errorCallback', 'objectWithCallback' ].includes(arg.type);
