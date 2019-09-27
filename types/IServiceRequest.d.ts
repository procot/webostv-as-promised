export declare interface IServiceRequestParams {
  /**
   * The service method being called.
   */
  method?: string;

  /**
   * The JSON object of the request parameters to send.
   */
  parameters?: object;

  /**
   * Indicates whether a subscription is desired for this request.
   * - true: Request the subscription.
   * - false: Not request the subscription.
   */
  subscribe?: boolean;

  /**
   * Indicates whether the request should resubscribe after a failure has occurred.
   * - true: Request the re-subscription.
   * - false: Not request the re-subscription.
   */
  resubscribe?: boolean;
}

export declare interface IServiceRequestReturn {
  /**
   * Cancels the service request and any associated subscription. No argument is required.
   */
  cancel: () => void;
}
