# @yu1107/test-npm-package

TypeScript で書いた npm パッケージのサンプルです。

## インストール

```bash
npm install @yu1107/test-npm-package
```

## 使い方

```js
import myPackage, { normalize } from "@yu1107/test-npm-package";

console.log(normalize("  hello  ")); // "hello"
console.log(myPackage(42)); // "42"
```

CommonJS の場合:

```js
const myPackage = require("@yu1107/test-npm-package");

console.log(myPackage.default("  hello  "));
```

## ローカル開発

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```
