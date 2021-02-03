#! /bin/bash

# Environment
PIP=$(which pip3)
PYTHON=$(which python3)

# Bring in management helper commands
source /runtime/management.sh;

function initial_setup_dirs_project()
{
  echo  "Starting dirs and project setup" && echo ""

  # Prep users and dirs
  check_user
  check_dirs

  # Create the project files
  create_tendenci_project
  install_theme
  set_directory_permissions

  echo  "Finished dirs and project setup" && echo ""
}

if [ -f "$TENDENCI_PROJECT_ROOT/conf/first_run" ]; then
  echo "Cannot run setup once already run" >&2
  exit 1
fi

if [ ! -f "$TENDENCI_PROJECT_ROOT/conf/first_run" ]; then
  initial_setup_dirs_project
fi
