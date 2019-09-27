# webostv-as-promised

Wrapper library [webOSTV.js](http://webostv.developer.lge.com/api/webostvjs/) on Promise

## Install

```bash
npm i webostv-as-promised -S
```

## Usage

### webOS API

```javascript
import { WebOSPromised } from 'webostv-as-promised';

const webOS = new WebOSPromised;

console.log(webOS.libVersion);

console.log(webOS.systemInfo());

webOS.deviceInfo()
  .then(info => console.log(info));
```

### webOSDev API

```javascript
import { WebOSDevPromised } from 'webostv-as-promised';

const webOSDev = new WebOSDevPromised;

console.log(webOSDev.APP.BROWSER);

webOSDev.LGUDID()
  .then(res => console.log(res.id));

console.log(webOSDev.launchParams());
```
