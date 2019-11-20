import initApiPromise from '../../testHelper/initApiPromise';
import { Keyring } from '@polkadot/keyring';

const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

describe('api', () => {
  test('should be able to be initialized', async () => {
    const api = await initApiPromise();
    await api.isReady;

    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);

    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
  });

  describe('transfer', () => {
    test('should be able to made', async () => {
      const api = await initApiPromise();
      await api.isReady;

      const keyring = new Keyring({ type: 'sr25519' });
      const alice = keyring.addFromUri('//Alice');

      let previous = await api.query.balances.freeBalance(Alice);

      console.log(`${Alice} has a balance of ${previous}`);
      console.log(
        `You may leave this example running and start example 06 or transfer any value to ${Alice}`
      );

      const transfer = api.tx.balances.transfer(BOB, 12345);
      const hash = await transfer.signAndSend(alice);

      console.log('Transfer sent with hash', hash.toHex());

      // Here we subscribe to any balance changes and update the on-screen value
      await api.query.balances.freeBalance(Alice, current => {
        console.log('revious', previous);
        console.log('current', current);
        // Calculate the delta
        const change = current.sub(previous);

        // Only display positive value changes (Since we are pulling `previous` above already,
        // the initial balance change will also be zero)
        if (!change.isZero()) {
          previous = current;
          // Transfer sent with hash 0xf5a4dcd351a9bc26b8767b7a3ba82ac0e0b590dd896f59b03bc0f7c10d9be3f0

          // console.log src/__tests__/api.test.js:43
          //   revious <BN: 3635c99e50996d2893>

          // console.log src/__tests__/api.test.js:44
          //   current <BN: 3635c99e50996d2893>

          console.log(`New balance change of: ${change}`);
          expect(change).toBe(12345);
        }
      });
    });
  });
});
