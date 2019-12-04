import { promisifyDrmAgent } from '../promisifyWebOSObject';

/**
 * Scheme of fields and methods for webOSDev object
 *
 * @type {import('../../types').WebOSDevScheme}
 */
export const webOSDevScheme = {
  APP: {
    type: 'field'
  },
  DRM: {
    type: 'field'
  },
  drmAgent: {
    type: 'method',
    mapAfter: drmAgent => promisifyDrmAgent(drmAgent)
  },
  launch: {
    type: 'field',
    args: [
      { type: 'objectWithCallback' }
    ]
  },
  launchParams: {
    type: 'method'
  },
  LGUDID: {
    type: 'method',
    args: [
      { type: 'successCallback' },
      { type: 'errorCallback' }
    ]
  },
  connection: {
    type: 'field',
    value: {
      getStatus: {
        type: 'method',
        args: [
          { type: 'objectWithCallback' }
        ]
      }
    }
  }
};
