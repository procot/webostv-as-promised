# webostv-as-promised

Wrapper library [webOSTV.js](http://webostv.developer.lge.com/api/webostvjs/) on Promise

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
systemTimeRequest.return.cancel();
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
