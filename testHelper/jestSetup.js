import initApiPromise from './initApiPromise';
import config from '../config';

console.log('jetSetup.js is loaded in env: ', process.env.NODE_ENV);
console.log('api timeout is: ', config.apiTimeOut);

global.apiPromise = initApiPromise();
jest.setTimeout(config.apiTimeOut);
