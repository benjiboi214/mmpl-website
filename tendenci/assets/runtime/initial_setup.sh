#! /bin/bash

# Environment
PIP=$(which pip3)
PYTHON=$(which python3)

# Bring in management helper commands
source /runtime/management.sh;

function initial_setup()
{
  echo  "Starting initial setup" && echo ""

  # Prep users and dirs
  check_user
  check_dirs

  # Create the project files
  create_tendenci_project
  install_theme
  set_directory_permissions

  # Copy the deployment config volume
  copy_config_from_image

  # Initial Django commands
  initial_migrate_database
  collect_static
  update_tendenci_app_settings
  clear_theme_cache
  populate_default_entity_and_auth_groups
  load_initial_data
  load_tendenci_defaults
  update_dashboard_stats
  set_site_url
  create_superuser

  # Trip flag after setup
  touch "$TENDENCI_PROJECT_ROOT/conf/first_run"
  echo  "Intital set up completed" && echo ""
}

if [ ! -f "$TENDENCI_PROJECT_ROOT/conf/first_run" ]; then
  initial_setup
fi

if [ -f "$TENDENCI_PROJECT_ROOT/conf/first_run" ]; then
  echo "Cannot run setup once already run" >&2
  exit 1
fi
