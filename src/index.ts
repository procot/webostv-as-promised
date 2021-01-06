if (!Promise) {
  throw new Error('Promise is needed to use `webostv-as-promised`');
}

export { promisifyDrmAgent } from './promisifyDrmAgent';
export { promisifyRequest } from './promisifyRequest';
export { promisifyWebOS } from './promisifyWebOS';
export { promisifyWebOSDev } from './promisifyWebOSDev';
export * from './types';
