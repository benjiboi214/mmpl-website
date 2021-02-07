#! /bin/bash

# Environment
PIP=$(which pip3)
PYTHON=$(which python3)

# Bring in management helper commands
source /runtime/management.sh;

function initial_setup_initial_migrate()
{
  echo  "Starting initial migration" && echo ""

  # Initial Django commands
  initial_migrate_database

  echo  "Finished initial migration" && echo ""
}

if [ -f "$TENDENCI_PROJECT_ROOT/conf/first_run" ]; then
  echo "Cannot run setup once already run" >&2
  exit 1
fi

if [ ! -f "$TENDENCI_PROJECT_ROOT/conf/first_run" ]; then
  initial_setup_initial_migrate
fi
