/**
 * Scheme of fields and methods for DRMAgent instance
 *
 * @type {import('../../types').DRMAgentScheme}
 */
export const drmAgentScheme = {
  getClientId: {
    type: 'method'
  },
  getDrmType: {
    type: 'method'
  },
  getErrorCode: {
    type: 'method'
  },
  getErrorText: {
    type: 'method'
  },
  getRightsError: {
    type: 'method',
    args: [
      { type: 'objectWithCallback' }
    ]
  },
  load: {
    type: 'method',
    args: [
      { type: 'objectWithCallback' }
    ]
  },
  isLoaded: {
    type: 'method',
    args: [
      { type: 'objectWithCallback' }
    ]
  },
  sendDrmMessage: {
    type: 'method',
    args: [
      { type: 'objectWithCallback' }
    ]
  },
  unload: {
    type: 'method',
    args: [
      { type: 'objectWithCallback' }
    ]
  }
};
