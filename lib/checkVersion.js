const semver = require('semver');
const getVersion = require('./getVersion');
const packageVersion = require('../package.json').version;

/**
 * @description: getVersion 获取最新版本号，使用 semver 比较本地与 npmjs.org 版本
 * @return {Promise}: 如果是最新版本 resolve()， 否则 reject()，并返回最新版本号
 */
function checkVersion(){
  return new Promise((resolve, reject) => {
    getVersion(`https://registry.npmjs.org/x-build/latest`)
    .then(version => {
      let isNew = semver.lte(version, packageVersion);
      if (isNew) {
        resolve();
      } else {
        reject(version);
      }
    });
  });
}

module.exports = checkVersion;