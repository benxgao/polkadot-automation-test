import R from 'ramda';

import defaultConfig from './default';

const config = {
  wsProvider: {
    integration: 'ws://node_alice:9944', // TODO: Give a generic name on accessing node
    e2e: 'wss://dev-node.substrate.dev:9944'
  }
};

export default R.mergeDeepRight(defaultConfig, config);
