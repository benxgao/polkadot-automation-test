import { ApiPromise, WsProvider } from '@polkadot/api';
// import { api } from '../api';
import config from '../../config';

describe('api', () => {
  test('should be able to be initialized', async () => {
    console.log('process.env.TEST_TYPE: ', process.env.TEST_TYPE);
    console.log('config', config);

    const providerUrl = config.wsProvider[`${process.env.TEST_TYPE || 'default'}`];
    console.log('providerUrl', providerUrl);

    const wsProvider = new WsProvider(providerUrl);
    const api = await ApiPromise.create({ provider: wsProvider });

    await api.isReady;

    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);

    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
  });
});
