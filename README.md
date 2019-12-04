# webos-as-promised

Wrapper library [webOSTV.js](http://webostv.developer.lge.com/api/webostvjs/) on Promise

## Install

```bash
npm i webos-as-promised -S
```

## Usage

### webOS API

```javascript
import { promisifyWebOS } from 'webos-as-promised';

const promisedWebOS = promisifyWebOS(window.webOS);

console.log(promisedWebOS.libVersion);

console.log(promisedWebOS.systemInfo());

promisedWebOS.deviceInfo().callResult
  .then(info => console.log(info));
```

### webOSDev API

```javascript
import { promisifyWebOSDev } from 'webos-as-promised';

const promisedWebOSDev = promisifyWebOSDev(window.webOSDev);

console.log(promisedWebOSDev.APP.BROWSER);

promisedWebOSDev.LGUDID().callResult
  .then(res => console.log(res.id));

console.log(promisedWebOSDev.launchParams());
```
