#! /bin/bash

# Environment
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Run Deployment
kubectl delete -f "$DIR/../website.yml"
