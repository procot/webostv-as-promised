export const ERROR_CODE = 1;
export const ERROR_TEXT = 'text';

export interface IReturn {
  parameters: any;
  args: any[];
}

export function methodWithHadlers(isSuccess = true) {
  return (...args: any[]) => {
    const parametersWithHadlers = args.filter(arg => typeof arg === 'object')[0];
    const parameters = args.filter(arg => typeof arg !== 'object');
    const { onSuccess, onFailure, ...params } = parametersWithHadlers;
    if (isSuccess) {
      setTimeout(() => onSuccess({ parameters: params, args: parameters }), 0);
    } else {
      setTimeout(() => onFailure({ errorCode: ERROR_CODE, errorText: ERROR_TEXT }), 0);
    }
  }
}
