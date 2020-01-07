import 'core-js/stable';
import 'regenerator-runtime/runtime';
import BN from 'bn.js';
import { Keyring } from '@polkadot/keyring';
// import initApiPromise from '../testHelper/initApiPromise';

const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const Bob = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

const transfer = async api => {
  const keyring = new Keyring({ type: 'sr25519' });

  // keyring.getPair(Alice)
  const alice = keyring.addFromUri('//Alice');
  const nonce = await api.query.system.accountNonce(Alice);
  const previous = await api.query.balances.freeBalance(Alice);

  console.log(`${Alice}: nonce (${nonce}) has a balance of ${previous}`);

  return await api.tx.balances
    .transfer(Bob, 1)
    .signAndSend(alice, { nonce }, async ({ events = [], status }) => {
      console.log('Transaction status:', status.type);

      if (status.isFinalized) {
        console.log('Completed at block hash', status.asFinalized.toHex());
        console.log('Events:');

        // {"ApplyExtrinsic":2} : balances.Transfer ["5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY","5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",12345,1000000000000]
        // {"ApplyExtrinsic":2} : system.ExtrinsicSuccess []
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });

        return await api.query.balances.freeBalance(Alice, current => {
          const change = previous.sub(current);
          console.log('previous', previous);
          console.log('current', current);
          console.log('change', change);
          console.log('previous.toString(10)', previous.toString(10));
          console.log('current.toString(10)', current.toString(10));
          console.log('change.toString(10)', change.toString(10));

          //999999989746296312445
          //999999996614122619999
          //999999993228293363558
          //3385829256441
          // -3414269922865
          console.log(`New balance change of: ${change}`);
          return change;
          // if (!change.isZero()) {
          //   console.log(`New balance change of: ${change.toString(10)}`);
          //   expect(change).toBe(12345);
          // }
        });
      }
    });
};

export { transfer };
