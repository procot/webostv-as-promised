interface WebOSTVCallbackMethod {
  (...args: any[]): any;
}

export interface CallReturn<T = any> {
  /**
   * The value returned when the function is called
   */
  result: T;
}

export function promisifyMethod<T = any, TReturn = any>(method: WebOSTVCallbackMethod, parameters = {}, ...args: any[]) {
  return new Promise<T & CallReturn<TReturn>>((resolve, reject) => {
    const result = method(...args.concat({
      ...parameters,
      onSuccess: (res: any) => resolve(Object.assign(res, { result })),
      onFailure: (error: any) => reject(new Error(`${error.errorCode}.${error.errorText}`))
    }));
  });
}
