import { GenericAsset } from '@cennznet/crml-generic-asset';
import { Metadata } from '@polkadot/types';
import { Keyring } from '@polkadot/keyring';
import initApiPromise from '../../testHelper/initApiPromise';

const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const Bob = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

describe('api', () => {
  let api;
  let blockHash;
  beforeAll(async () => {
    api = await initApiPromise();
    await api.isReady;
    blockHash = await api.rpc.chain.getBlockHash();
  });

  afterAll(async done => {
    if (api) {
      return await api.disconnect();
    }
    api = null;
    done();
  });
  test('should be able to be initialized', async () => {
    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);
    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

    const runtimeMetadata = api.runtimeMetadata.toJSON();
    const genesisHash = api.genesisHash.toHex();
    const specVersion = api.runtimeVersion.specVersion.toNumber();

    // const meta = api.rpc.state.getMetadata;
    // const metadata = new Metadata(meta).toJSON();

    console.log('runtimeMetadata', runtimeMetadata);
    console.log('genesisHash', genesisHash);
    console.log('specVersion', specVersion);
    // expect(metadata).toEqual(runtimeMetadata);
  });

  test('should be able to made', async done => {
    const keyring = new Keyring({ type: 'sr25519' });

    expect(api.query).toBeDefined();
    console.log(api.tx.genericAsset);

    // keyring.getPair(Alice)
    const alice = keyring.addFromUri('//Alice');
    const nonce = await api.query.system.accountNonce(Alice);
    const previous = await api.query.genericAsset.freeBalance(16000, Alice);

    console.log(`${Alice}: nonce (${nonce}) has a balance of ${previous.toString(10)}`);

    return await api.tx.genericAsset
      .transfer(16000, Bob, 100)
      .signAndSend(alice, { nonce }, async ({ events = [], status }) => {
        console.log('Transaction status:', status.type);

        if (status.isFinalized) {
          console.log('Completed at block hash', status.asFinalized.toHex());

          events.forEach(({ phase, event: { data, method, section } }) => {
            console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
          });

          return await api.query.balances.freeBalance(Alice, current => {
            console.log('current: ', current);
            console.log(`New balance change of: ${current.sub(previous)}`);

            const transferred = current.sub(previous) < 0;
            expect(transferred).toBe(true);
            done();
          });
        }
      });
  });
});
