#! /bin/bash

# Environment
PIP=$(which pip3)
PYTHON=$(which python3)

# Bring in management helper commands
source /runtime/management.sh;

function copy_theme()
{
  echo  "Copying theme dir again" && echo ""

  # Prep users and dirs
  check_user
  check_dirs

  # Copy theme
  install_theme

  echo  "Done copying theme dir again" && echo ""
}

copy_theme
