import R from 'ramda';

import defaultConfig from './default';

const config = {
  wsProvider: {
    integration: 'ws://0.0.0.0:9944',
    e2e: 'wss://dev-node.substrate.dev:9944'
  }
};

export default R.mergeDeepRight(defaultConfig, config);
