# webostv-as-promised

Wrapper library [webOSTV.js](http://webostv.developer.lge.com/api/webostvjs/) on Promise

# Important

You should have `Promise` implementation to use `webostv-as-promised`, because `webostv-as-promised` uses `Promise`.

If you want to use `webostv-as-promised` on LG webOS versions where `Promise` doesn't exists then to use a polyfill for `Promise`. Example: [`promise-polyfill`](https://www.npmjs.com/package/promise-polyfill).

## Install

```bash
npm i webostv-as-promised -S
```

## Usage

### webOS API

```javascript
import { promisifyWebOS } from 'webostv-as-promised';

const promisedWebOS = promisifyWebOS(window.webOS);

console.log(promisedWebOS.libVersion);

console.log(promisedWebOS.systemInfo());

promisedWebOS.deviceInfo()
  .then(info => console.log(info));

const systemTimeRequest = promisedWebOS.service.request('luna://com.palm.systemservice', {
    method: 'time/getSystemTime',
    parameters: { subscribe: true }
});
systemTimeRequest.promise.then(res => console.log(res));
// or
systemTimeRequest.returnValue.cancel();
```

### webOSDev API

```javascript
import { promisifyWebOSDev } from 'webostv-as-promised';

const promisedWebOSDev = promisifyWebOSDev(window.webOSDev);

console.log(promisedWebOSDev.APP.BROWSER);

promisedWebOSDev.LGUDID()
  .then(res => console.log(res.id));

console.log(promisedWebOSDev.launchParams());
```
