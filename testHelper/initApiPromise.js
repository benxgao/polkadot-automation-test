import { ApiPromise, WsProvider } from '@polkadot/api';
// import { api } from '../api';
import config from '../config';

const initApiPromise = async () => {
  const providerUrl = config.wsProvider[`${process.env.TEST_TYPE || 'default'}`];
  const wsProvider = new WsProvider(providerUrl);
  console.log('providerUrl', providerUrl);

  console.log('process.env.TEST_TYPE: ', process.env.TEST_TYPE);
  return await ApiPromise.create({ provider: wsProvider });
};

export default initApiPromise;
