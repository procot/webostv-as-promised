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

promisedWebOS.deviceInfo()
  .then(info => console.log(info));

const systemTimeRequest = promisedWebOS.service.request('luna://com.palm.systemservice', {
    method: 'time/getSystemTime',
    parameters: { subscribe: true }
});
systemTimeRequest.promise.then(res => console.log(res));
// or
systemTimeRequest.result.cancel();
```

### webOSDev API

```javascript
import { promisifyWebOSDev } from 'webos-as-promised';

const promisedWebOSDev = promisifyWebOSDev(window.webOSDev);

console.log(promisedWebOSDev.APP.BROWSER);

promisedWebOSDev.LGUDID()
  .then(res => console.log(res.id));

console.log(promisedWebOSDev.launchParams());
```

## webOSTV.js library

Folder `lib` contains a source code (`webOSTV.js`, `webOSTV-dev.js`) of the webOSTV.js library which may be includes to the js bundle for LG webOS web application.

For example, include `webOSTV.js`:
```javascript
import 'webos-as-promised/lib/webOSTV';
```
or
```javascript
require('webos-as-promised/lib/webOSTV');
```

For example, include `webOSTV-dev.js`:
```javascript
import 'webos-as-promised/lib/webOSTV-dev';
```
or
```javascript
require('webos-as-promised/lib/webOSTV-dev');
```
