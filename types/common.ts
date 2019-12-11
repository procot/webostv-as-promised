import { DRMAgentPromised } from './DrmAgentPromised';
import { WebOSDevPromised } from './WebOSDevPromised';
import { WebOSPromised } from './WebOSPromised';

/**
 *  Type of argument in scheme
 */
export type SchemeArgType = 'successCallback' | 'errorCallback' | 'value' | 'objectWithCallback';

export interface SchemeArg {
  type: SchemeArgType;
  successName?: string;
  errorName?: string;
}

export interface SchemeField<T> {
  type: 'field' | 'method';
  value?: Scheme<T>;
  args?: SchemeArg[];
  mapAfter?: Callback;
}

/**
 * Scheme of any object
 */
export type Scheme<T = any> = {
  [k in keyof T]: SchemeField<T[k]>;
};

export type WebOSScheme = Scheme<WebOSPromised>;
export type WebOSDevScheme = Scheme<WebOSDevPromised>;
export type DRMAgentScheme = Scheme<DRMAgentPromised>;

/**
* Construct a type with a set of properties K of type T
*/
export type ObjectValue = {
  [k: string]: any;
};

export type Callback = (...args: any[]) => any;

/**
 * Return type of asyncronous method
 */
export interface AsyncMethodReturnType<Result, Return = undefined> {
  /**
   * Value of success execution asyncronous method
   */
  promise: Promise<Result>;
  /**
   * Return value of asyncronous method
   */
  result: Return;
}
