#! /bin/bash

# Environment
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Run Deployment
kubectl apply -f "$DIR/../production.yml"
kubectl apply -f "$DIR/../memcached.yml"
kubectl apply -f "$DIR/../tendenci.yml"
kubectl apply -f "$DIR/../website.yml"
