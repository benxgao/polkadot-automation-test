<h1 align="center">
  substrate-automation-test
</h1>
<p align="center">
  <a href="https://circleci.com/gh/benxgao/substrate-automation-test">
    <img src="https://circleci.com/gh/benxgao/substrate-automation-test.svg?style=shield" alt="Current CircleCI build status." />
  </a>
  <a href="https://gatsbyjs.org/contributing/how-to-contribute/">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://codecov.io/gh/benxgao/substrate-automation-test/">
    <img src="https://img.shields.io/codecov/c/github/benxgao/substrate-automation-test/coverage.svg?style=flat-square" alt="Test coverage" />
  </a>
</p>

## Get started

```bash
# Run e2e tests, which is also works on CircleCI:
# https://circleci.com/gh/benxgao/substrate-automation-test
./scripts/circleci/run_automation_test.sh -t e2e
```

## Play around

```bash
# Create standalone network as external of testnet
docker network create --driver bridge standalone

# Tear up docker containers
./scripts/start_testnet.sh

# Check available containers
docker ps

# Check inside a docker with bash
docker exec -it [DOCKER_ID] bash

# Check standalone networking
docker network ls
docker network inspect standalone

# Tear down containers and clean up temp files
./scripts/clear_testnet.sh
```

## Development in Dockerfile

```bash
# Build docker images whenever Dockerfile was modified
docker-compose build

# Run testing by running a docker
docker run $(docker ps | grep "e2e" | awk '/ / { print $2 }') npm run test:e2e
```

## To do

- Spin up containers in sequence by `wait-for-it.sh`;
- Relace `Substrate` with a particular network;
