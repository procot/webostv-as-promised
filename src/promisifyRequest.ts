import { RequestCallback } from './types';

/**
 * Wraps a method for returning the promise
 * @param fn a method for wrapping
 * @param hasReturnObject should return a object with field promise and field with return value of method (Default: `false`)
 * @returns wrapped method
 */
export function promisifyRequest<
  Result,
  MethodReturnType,
  Params extends {} | undefined,
  HasReturnObject extends boolean = false,
>(
  fn: (params: RequestParams<Result> & Params) => MethodReturnType,
  hasReturnObject?: HasReturnObject
): PromisedRequestMethod<
  Result,
  MethodReturnType,
  Params,
  HasReturnObject
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
    return hasReturnObject ? resultObject : resultObject.promise;
  }) as any;
}

/**
 * The type that presents the object return value of a promised method
 */
export interface PromisedRequestMethodReturnTypeObject<ReturnValue, Result> {
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
  MethodReturnType,
  Params extends {} | undefined,
  HasReturnObject extends boolean
> = (
  params: Params extends undefined
    ? void
    : (
      Exclude<keyof Params, RequestCallback> extends never
        ? void
        : Omit<Params, RequestCallback>
    )
) => PromisedRequestMethodReturnType<Result, MethodReturnType, HasReturnObject>;

/**
 * The type that presents the return type of promised method
 */
export type PromisedRequestMethodReturnType<
  Result,
  MethodReturnType,
  HasReturnObject extends boolean,
> = HasReturnObject extends true ? PromisedRequestMethodReturnTypeObject<MethodReturnType, Result> : Promise<Result>;
