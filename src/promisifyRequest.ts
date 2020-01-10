import { RequestCallback } from './types';

/**
 * Wraps a method for returning the promise
 * @param fn a method for wrapping
 * @param returnObject should return a object with field promise and field with return value of method (Default: `false`)
 * @returns wrapped method
 */
export function promisifyRequest<
  Result,
  MethodReturn,
  Params extends {} | undefined,
  ReturnObject extends true | false | undefined = undefined,
>(
  fn: (params: RequestParams<Result> & Params) => MethodReturn,
  returnObject?: ReturnObject
): PromisedRequestMethod<
  Result,
  MethodReturn,
  Omit<Params, RequestCallback>,
  ReturnObject
> {
  return ((params?: Omit<Params, RequestCallback>) => {
    const resultObject: any = {};
    resultObject.promise =  new Promise<Result>((resolve, reject) => {
      resultObject.returnValue = fn({
        ...(params || {}),
        onSuccess: resolve,
        onFailure: errObj => reject(new Error(`Error: ${errObj.errorCode}.${errObj.errorText}`))
      } as Params & RequestParams<Result>);
    });
    return returnObject ? resultObject : resultObject.promise;
  }) as any;
}

/**
 * The type that presents the object return value of a promised method
 */
export interface PromisedRequestMethodReturnObject<ReturnValue, Result> {
  /**
   *  Return object of method
   */
  returnValue: ReturnValue;
  /**
   * Method execution promise
   */
  promise: Promise<Result>;
}

/**
 * The type that presents the promised method
 */
export type PromisedRequestMethod<
  Result,
  MethodReturn,
  Params extends Omit<{}, RequestCallback>,
  ReturnObject extends true | false | undefined,
> = Params extends Pick<Params, never>
  ? (params?: Params) => PromisedRequestMethodReturn<Result, MethodReturn, ReturnObject>
  : (params: Params) => PromisedRequestMethodReturn<Result, MethodReturn, ReturnObject>;

/**
 * The type that presents the return type of promised method
 */
export type PromisedRequestMethodReturn<
  Result,
  MethodReturn,
  ReturnObject extends true | false | undefined,
> = ReturnObject extends true ? PromisedRequestMethodReturnObject<MethodReturn, Result> : Promise<Result>;
