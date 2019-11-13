/* eslint-disable */
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
module.exports = require(`./${process.env.NODE_ENV}`);
/* eslint-enable */
