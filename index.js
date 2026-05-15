const { normalize } = require("./lib/utils");

module.exports = function myPackage(value) {
  return normalize(value);
};


// const { onPackageInstall } = require("./scripts/router_init");

// // パッケージインストール時に onPackageInstall を呼び出す
// function main(input) {
//     onPackageInstall();
// }

// module.exports = main;