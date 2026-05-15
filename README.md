## 使い方

## ローカルでの使い方
```bash
npm install ./my-package
npm uninstall @yu1107/my-package
```


```js
const myPackage = require("@yu1107/my-package");

console.log(myPackage.joke());
console.log(myPackage.fortune("名前"));
console.log(myPackage.bugReport());
console.log(myPackage.summonBug());
```