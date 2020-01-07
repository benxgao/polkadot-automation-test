import { WsProvider } from '@polkadot/api';
import { Api as ApiPromise } from '@cennznet/api';
import config from '../config';

console.log('ApiPromise', ApiPromise);

const initApiPromise = async () => {
  const providerUrl = config.wsProvider[`${process.env.TEST_TYPE || 'default'}`];
  const wsProvider = new WsProvider(providerUrl);
  console.log('providerUrl', providerUrl);

  console.log('process.env.TEST_TYPE: ', process.env.TEST_TYPE);

  const startOfInitApi = Date.now();
  const api = await ApiPromise.create({ provider: wsProvider });

  await api.isReady;

  const endOfInitApi = Date.now();
  console.log('Time spent on initialising Api: ', endOfInitApi - startOfInitApi);

  return api;
};

export default initApiPromise;
