/**
 * Scheme of fields and methods for webOS object
 *
 * @type {import('../../types').WebOSScheme}
 */
export const webOSScheme = {
  libVersion: {
    type: 'field',
  },
  platform: {
    type: 'field',
  },
  deviceInfo: {
    type: 'method',
    args: [
      { type: 'successCallback' }
    ]
  },
  fetchAppId: {
    type: 'method',
  },
  fetchAppInfo: {
    type: 'method',
    args: [
      { type: 'successCallback' },
      { type: 'value' }
    ]
  },
  fetchAppRootPath: {
    type: 'method'
  },
  platformBack: {
    type: 'method'
  },
  systemInfo: {
    type: 'method'
  },
  keyboard: {
    type: 'field',
    value: {
      isShowing: {
        type: 'method'
      }
    }
  },
  service: {
    type: 'field',
    value: {
      request: {
        type: 'method',
        args: [
          { type: 'value' },
          { type: 'objectWithCallback' }
        ]
      }
    }
  }
};
