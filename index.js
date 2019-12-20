/**
 * @param {WebOS} webOS
 * @returns {import('.').WebOSPromised}
 */
export function promisifyWebOS(webOS) {
  /** @type {WebOS} */
  const webOSPromised = Object.create(webOS);
  webOSPromised.deviceInfo = () => new Promise(resolve => webOS.deviceInfo(resolve));
  webOSPromised.fetchAppInfo = path => new Promise(resolve => webOS.fetchAppInfo(resolve, path));
  webOSPromised.service.request = (uri, params) => {
    const binded = webOS.service.request.bind(webOS.service, uri);
    return promisifyRequest(binded)(params);
  };

  return webOSPromised;
}

/**
 * @param {WebOSDev} webOSDev
 * @returns {import('.').WebOSDevPromised}
 */
export function promisifyWebOSDev(webOSDev) {
  /** @type {WebOSDev} */
  const webOSDevPromised = Object.create(webOSDev);

  webOSDevPromised.launch = promisifyRequest(webOSDev.launch.bind(webOSDev));
  webOSDevPromised.LGUDID = promisifyRequest(webOSDev.LGUDID.bind(webOSDev));
  webOSDevPromised.connection.getStatus = promisifyRequest(webOSDev.connection.getStatus.bind(webOSDev.connection));
  webOSDevPromised.drmAgent = type => promisifyDrmAgent(webOSDev.drmAgent(type));

  return webOSDevPromised;
}

/**
 * @param {DRMAgent} drmAgent
 * @returns {import('.').DRMAgentPromised}
 */
export function promisifyDrmAgent(drmAgent) {
  /** @type {DRMAgent} */
  const drmAgentPromised = Object.assign(drmAgent);

  drmAgentPromised.getRightsError = promisifyRequest(drmAgent.getRightsError.bind(drmAgent));
  drmAgentPromised.isLoaded = promisifyRequest(drmAgent.isLoaded.bind(drmAgent));
  drmAgentPromised.load = promisifyRequest(drmAgent.load.bind(drmAgent));
  drmAgentPromised.sendDrmMessage = promisifyRequest(drmAgent.sendDrmMessage.bind(drmAgent));
  drmAgentPromised.unload = promisifyRequest(drmAgent.unload.bind(drmAgent));

  return drmAgentPromised;
}

export function promisifyRequest(fn) {
  return params => {
    return new Promise((resolve, reject) => {
      fn(
        Object.assign(params || {}, {
          onSuccess: resolve,
          onFailure: errObj => reject(new Error(`Error: ${errObj.errorCode}.${errObj.errorText}`))
        })
      );
    });
  }
}
