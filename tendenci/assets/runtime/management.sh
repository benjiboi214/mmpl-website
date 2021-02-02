# Environment
PIP=$(which pip3)
PYTHON=$(which python3)

# Check directories and create them if necessary
function check_dirs()
{
  for dir in $TENDENCI_INSTALL_DIR\
      $TENDENCI_LOG_DIR;
do
  [ -d "$dir" ] || mkdir "$dir"
  chown "$TENDENCI_USER:" "$dir"
done
}

# Check user to run the application, create it if not done yet
function check_user()
{
  if ! grep -i "^$TENDENCI_USER" /etc/passwd; then
    useradd -b "$TENDENCI_HOME" -U "$TENDENCI_USER"
  fi
}

# function create_cronjobs()
# {
#   echo "Creating cronjobs" && echo ""
#   (crontab -l ; echo "30   2 * * * $PYTHON $TENDENCI_INSTALL_DIR/manage.py run_nightly_commands") | crontab -
#   (crontab -l ; echo "30   2 * * * $PYTHON $TENDENCI_INSTALL_DIR/manage.py process_unindexed") | crontab -
# }

function create_tendenci_project()
{
  # Creating tendenci project
  echo "Creating tendenci project" && echo ""
  cd "$TENDENCI_INSTALL_DIR"
  tendenci startproject "$APP_NAME" "$APP_NAME"
  cd "$APP_NAME"
  echo "Done creating tendenci project" && echo ""
}

function install_theme() 
{
  #Install theme
  echo "Installing theme" && echo ""
  mkdir "$TENDENCI_PROJECT_ROOT"/themes/tendenci2020
  cd "$TENDENCI_INSTALL_DIR"
  PACKAGE_ORIGIN=$(pip3 show tendenci | grep Location:)
  THEME_ORIGIN=${PACKAGE_ORIGIN//"Location: "/}"/tendenci/themes/t7-tendenci2020"
  cd $THEME_ORIGIN
  cp -r ./* "$TENDENCI_PROJECT_ROOT"/themes/tendenci2020
  echo "Done installing theme" && echo ""
}

function set_directory_permissions()
{
  echo "Setting directory permissions" && echo ""
  mkdir "$TENDENCI_PROJECT_ROOT"/static
  chown "$TENDENCI_USER:" /var/log/"$APP_NAME"/
  chmod -R -x+X,g+rw,o-rwx /var/log/"$APP_NAME"/
  chown -R "$TENDENCI_USER:" "$TENDENCI_HOME"
  chmod -R -x+X,g-w,o-rwx "$TENDENCI_PROJECT_ROOT"/
  chmod +x                "$TENDENCI_PROJECT_ROOT"/manage.py
  chmod -R ug-x+rwX,o-rwx "$TENDENCI_PROJECT_ROOT"/media/
  chmod -R ug-x+rwX,o-rwx "$TENDENCI_PROJECT_ROOT"/themes/
  chmod -R ug-x+rwX,o-rwx "$TENDENCI_PROJECT_ROOT"/whoosh_index/
  echo "Done setting directory permissions" && echo ""
}

function create_superuser
{
  echo "Starting super user set-up" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  echo "from django.contrib.auth import get_user_model; \
    User = get_user_model(); User.objects.create_superuser( \
    '${ADMIN_USER:-admin}', \
    '${ADMIN_MAIL:-admin@example.com}', \
    '${ADMIN_PASS:-password}')" \
    | "$PYTHON" manage.py shell
  echo "Finished super user set-up" && echo ""
}

function copy_config_from_image()
{
  # Preparing directories
  echo "Copying config from image to volume" && echo ""
  cp -r "$APP_CONFIG_DIR"/* "$TENDENCI_PROJECT_ROOT"/conf
  echo "Done copying config from image to volume" && echo ""
}

function initial_migrate_database()
{
  echo "Running initial migration" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  "$PYTHON" manage.py initial_migrate
  echo "Done running initial migration" && echo ""
}

function collect_static()
{
  echo "Collecting and uploading static files" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  "$PYTHON" manage.py collectstatic --noinput
  echo "Done collecting and uploading static files" && echo ""
}

function find_static()
{
  echo "Debugging find static" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  "$PYTHON" manage.py findstatic bootstrap3/css/bootstrap.min.css --verbosity 12
  echo "Done debugging find static" && echo ""
}

function update_tendenci_app_settings()
{
  echo "Updating tendenci app settings" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  "$PYTHON" manage.py update_settings
  echo "Done updating tendenci app settings" && echo ""
}

function clear_theme_cache()
{
  echo "Clearing tendenci theme cache" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  "$PYTHON" manage.py clear_theme_cache
  echo "Done clearing tendenci theme cache" && echo ""
}

function populate_default_entity_and_auth_groups()
{
  # AFAICT these commands are required for getting the tendenci2020 command working.
  # I have no clear understanding of why these commands exist.
  echo "Populating results" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  "$PYTHON" manage.py populate_default_entity
  "$PYTHON" manage.py populate_entity_and_auth_group_columns
  echo "Done populating results" && echo ""
}

function load_initial_data()
{
  echo "Loading initial data" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  "$PYTHON" manage.py loaddata "initial_data.json"
  echo "Done loading initial data" && echo ""
}

function load_tendenci_defaults()
{
  echo "Loading tendenci defaults" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  "$PYTHON" manage.py load_tendenci_defaults
  echo "Done loading tendenci defaults" && echo ""
}

function update_dashboard_stats()
{
  echo "Updating dashboard stats" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  "$PYTHON" manage.py update_dashboard_stats
  echo "Done updating dashboard stats" && echo ""
}

function set_site_url()
{
  echo "Setting Site URL" && echo ""
  cd "$TENDENCI_PROJECT_ROOT"
  "$PYTHON" manage.py set_setting site global siteurl "https://tendenci.mmpl.prod.jetselliot.com/" 	
  echo "Done setting Site URL" && echo ""
}

function run()
{
    cd "$TENDENCI_PROJECT_ROOT" \
    && "$PYTHON" manage.py runserver 0.0.0.0:8000
}