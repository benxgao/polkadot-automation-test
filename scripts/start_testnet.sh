#!/bin/bash

set -ex

if [ -z "$(docker network ls | grep "standalone" | awk '/ / { print $2 }')" ]; then
  docker network create --driver bridge standalone
fi

docker-compose up -d --build
docker-compose logs -f
