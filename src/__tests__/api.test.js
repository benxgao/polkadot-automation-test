import BN from 'bn.js';
import { Keyring } from '@polkadot/keyring';
import initApiPromise from '../../testHelper/initApiPromise';

const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const Bob = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

describe('api', () => {
  test('should be able to be initialized', async () => {
    const startOfInitApi = Date.now();
    const api = await initApiPromise();
    await api.isReady;
    const endOfInitApi = Date.now();

    console.log('Time spent on initialising Api: ', endOfInitApi - startOfInitApi);

    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);

    // console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
  });

  describe('transfer', () => {
    test('should be able to made', async done => {
      const api = await initApiPromise();
      await api.isReady;

      const keyring = new Keyring({ type: 'sr25519' });

      // keyring.getPair(Alice)
      const alice = keyring.addFromUri('//Alice');
      const nonce = await api.query.system.accountNonce(Alice);
      const previous = await api.query.balances.freeBalance(Alice);

      console.log(`${Alice}: nonce (${nonce}) has a balance of ${previous.toString(10)}`);

      return await api.tx.balances
        .transfer(Bob, 100)
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
});
