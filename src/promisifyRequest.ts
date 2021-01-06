type OnSuccessData<T extends WebOSTV.RequestParams> = T extends { onSuccess?(result: infer R): any } ? R : unknown;

export interface PromisifyRequest {
  <TParams>(
    fn: FnToPromisify<TParams>
  ): PromisedAndReturnedPromiseFn<TParams>;
  <TParams, TReturnFn>(
    fn: FnToPromisify<TParams, TReturnFn>,
    shouldReturnObject: true
  ): PromisedAndReturnedObjectFn<TParams, TReturnFn>;
  <TParams>(
    fn: FnToPromisify<TParams>,
    shouldReturnObject: false
  ): PromisedAndReturnedPromiseFn<TParams>;
  <TParams>(
    fn: FnToPromisify<TParams>,
    shouldReturnObject: undefined
  ): PromisedAndReturnedPromiseFn<TParams>;
}

interface FnToPromisify<TParams, TReturnFn = any> {
  (params: TParams): TReturnFn;
}

export type PromisedAndReturnedPromiseFn<TParams> = PromisedFunction<TParams, Promise<OnSuccessData<TParams>>>;

export type PromisedAndReturnedObjectFn<TParams, TReturnFn> = PromisedFunction<
  TParams,
  ReturnedObjectOfPromisedFn<TReturnFn, OnSuccessData<TParams>>
>;

type PromisedFunction<TParams, TReturn> = VoidOrPromisedParams<TParams> extends void
  ? () => TReturn
  : (params: VoidOrPromisedParams<TParams>) => TReturn;

type VoidOrPromisedParams<TParams> = TParams extends Record<string, any>
  ? Exclude<keyof TParams, keyof WebOSTV.RequestParams> extends never ? void : PromisedParams<TParams>
  : TParams;

type PromisedParams<TParams> = Omit<TParams, keyof WebOSTV.RequestParams>;

/**
 * Wraps a method for returning the promise
 * @param fn a method for wrapping
 * @param shouldReturnObject should return a object with field promise and field with return value of method (Default: `false`)
 * @returns wrapped method
 */
export const promisifyRequest: PromisifyRequest = (
  fn: (params: WebOSTV.RequestParams) => any,
  shouldReturnObject: boolean = false
) => {
  return (params: any = {}) => {
    const resultObject: any = {};
    resultObject.promise = new Promise<any>((resolve, reject) => {
      resultObject.returnValue = fn({
        ...params,
        onSuccess: resolve,
        onFailure: errObj => reject(new Error(`Error: ${errObj.errorCode}.${errObj.errorText}`))
      });
    });

    return shouldReturnObject ? resultObject : resultObject.promise;
  };
}

/**
 * The type that presents the object return value of a promised method
 */
export interface ReturnedObjectOfPromisedFn<TReturnFn, TOnSuccessResult> {
  /**
   *  Return object of method
   */
  returnValue: TReturnFn;
  /**
   * Method execution promise
   */
  promise: Promise<TOnSuccessResult>;
}
