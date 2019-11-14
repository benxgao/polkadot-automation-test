#!/bin/sh
# wait_for_testnet.sh

set -e

host="$1"
shift
cmd="$@"

# until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "postgres" -c '\q'; do
#   >&2 echo "Postgres is unavailable - sleeping"
#   sleep 1
# done

>&2 echo "Testnet is up"
exec $cmd
