#! /bin/bash

# Environment
PIP=$(which pip3)
PYTHON=$(which python3)

# Bring in management helper commands
source /runtime/management.sh;

if [ ! -f "$TENDENCI_PROJECT_ROOT/conf/first_run" ]; then
  echo "Cannot run if initial setup is not done" >&2
  exit 1
fi

if [ -f "$TENDENCI_PROJECT_ROOT/conf/first_run" ]; then
  run_wsgi "$@"
fi