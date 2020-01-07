const defaultConfig = {
  apiTimeOut: 30000,
  wsProvider: {
    default: 'ws://127.0.0.1:9944',
    integration: 'ws://node_alice:9944',
    e2e: 'wss://dev-node.substrate.dev:9944'
  }
};

export default defaultConfig;
