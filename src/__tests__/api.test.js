import { ApiPromise, WsProvider } from '@polkadot/api';
// import { api } from '../api';

describe('api', () => {
  test('should be able to be initialized', async () => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const apiPromise = await ApiPromise.create({ provider: wsProvider });

    await apiPromise.isReady;
    console.log('apiPromise.genesisHash.toHex()', apiPromise.genesisHash.toHex());
  });
});
