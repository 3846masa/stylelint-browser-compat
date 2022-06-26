#!/bin/bash
set -eux

## Clear npm_config_* env
unset "${!npm_config_@}"
unset "${!NPM_CONFIG_@}"

PACKAGE_NAME=$(npm -s run env echo '$npm_package_name')
PACKAGE_VERSION=$(npm -s run env echo '$npm_package_version')

## Set latest tag
npm dist-tag add "${PACKAGE_NAME}@${PACKAGE_VERSION}" latest --userconfig /tmp/.npmrc
