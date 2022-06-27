#!/bin/bash
set -eux

## Clear npm_config_* env
unset "${!npm_config_@}"
unset "${!NPM_CONFIG_@}"

PACKAGE_NAME=$(jq -r '.name' ./package.json)
PACKAGE_VERSION=$(jq -r '.version' ./package.json)

## Set latest tag
npm dist-tag add "${PACKAGE_NAME}@${PACKAGE_VERSION}" latest --userconfig /tmp/.npmrc
