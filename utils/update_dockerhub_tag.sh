#! /bin/bash

set -euxo pipefail

## Set these in Build Config
# DOCKER_HUB_ORG="***"
# DOCKER_HUB_REPO="mmpl-website"
# DOCKER_HUB_USER="$DOCKER_HUB_ORG"
# DOCKER_HUB_PASSWORD="***"

AUTH_DOMAIN="auth.docker.io"
AUTH_SERVICE="registry.docker.io"
AUTH_SCOPE="repository:${DOCKER_HUB_ORG}/${DOCKER_HUB_REPO}:pull,push"
AUTH_OFFLINE_TOKEN="1"
AUTH_CLIENT_ID="shell"

API_DOMAIN="index.docker.io"
CONTENT_TYPE="application/vnd.docker.distribution.manifest.v2+json"

export OLD_TAG=$BUDDY_EXECUTION_REVISION_SHORT
export NEW_TAG="production"

TOKEN=$(curl -v -X GET -u ${DOCKER_HUB_USER}:${DOCKER_HUB_PASSWORD} "https://${AUTH_DOMAIN}/token?service=${AUTH_SERVICE}&scope=${AUTH_SCOPE}&offline_token=${AUTH_OFFLINE_TOKEN}&client_id=${AUTH_CLIENT_ID}" | jq -r '.token')
MANIFEST=$(curl -v -H "Authorization: Bearer ${TOKEN}" -H "Accept: ${CONTENT_TYPE}" "https://${API_DOMAIN}/v2/${DOCKER_HUB_ORG}/${DOCKER_HUB_REPO}/manifests/${OLD_TAG}")
curl -X PUT -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: ${CONTENT_TYPE}" -d "${MANIFEST}" "https://${API_DOMAIN}/v2/${DOCKER_HUB_ORG}/${DOCKER_HUB_REPO}/manifests/${TAG_NEW}"
