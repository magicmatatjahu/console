#!/usr/bin/env bash

set -e

PWD=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd "${SCRIPT_DIR}/.." && pwd )" 

mkdir -p "${PWD}/temp" 
cp "${ROOT_DIR}/package.json" "${ROOT_DIR}/package-lock.json" "${ROOT_DIR}/gulpfile.js" "${ROOT_DIR}/tsconfig.base.json" "${PWD}/temp/"
cp -R "${ROOT_DIR}/common" "${PWD}/temp/common/"
cp -R "${ROOT_DIR}/components" "${PWD}/temp/components/"
