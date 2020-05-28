if (!Promise) {
  throw new Error('Promise is needed to use `webostv-as-promised`');
}

export { promisifyDrmAgent } from './src/promisifyDrmAgent';
export { promisifyRequest } from './src/promisifyRequest';
export { promisifyWebOS } from './src/promisifyWebOS';
export { promisifyWebOSDev } from './src/promisifyWebOSDev';
