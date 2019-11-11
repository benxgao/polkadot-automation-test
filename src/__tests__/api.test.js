import { ApiPromise, WsProvider } from '@polkadot/api';
// import { api } from '../api';

describe('api', () => {
  test('should be able to be initialized', async () => {
    const wsProvider = new WsProvider('ws://0.0.0.0:9944');
    const apiPromise = await ApiPromise.create({ provider: wsProvider });

    await apiPromise.isReady;

    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);

    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
  });
});
