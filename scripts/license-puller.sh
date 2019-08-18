#!/usr/bin/env bash

set -e

readonly ARGS=("$@")
readonly CWD=$PWD
readonly SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
readonly ROOT_DIR="$( cd "${SCRIPT_DIR}/.." && pwd )"

readonly LICENSE_PATH="licenses"

FETCH_ROOT_LICENSES=false
DIRS_TO_PULLING=
LICENSE_PULLER_PATH=
function read_arguments() {
    for arg in "${ARGS[@]}"
    do
        case $arg in
            --fetch-root-licenses)
              FETCH_ROOT_LICENSES=true
              shift # past argument with no value
              ;;
            --dirs-to-pulling=*)
              DIRS_TO_PULLING=($( echo "${arg#*=}" | tr "," "\n" ))
              shift # remove --dirs-to-pulling=
              ;;
            --license-puller-path=*)
              LICENSE_PULLER_PATH="${arg#*=}"
              shift # remove --license-puller-path=
              ;;
            *)
              # unknown option
            ;;
        esac
    done
    readonly FETCH_ROOT_LICENSES
    readonly DIRS_TO_PULLING
    readonly LICENSE_PULLER_PATH

    if [[ -z "${LICENSE_PULLER_PATH}" ]]; then
        echo -e "ERROR: license puller path is required"
        exit 1
    fi
}

function gatherRootLicenses() {
  if [ "${FETCH_ROOT_LICENSES}" == true ]; then
    echo "Gathering licenses for ${ROOT_DIR}"
    cd "${ROOT_DIR}" && bash "${LICENSE_PULLER_PATH}"
  fi
}

function gatherAppLicenses() {
  if [ "${#DIRS_TO_PULLING[@]}" -ne 0 ] && [ ! -z "${DIRS_TO_PULLING}" ]; then
    for d in "${DIRS_TO_PULLING[@]}"; do
      local directory="$( cd "${CWD}/${d}" && pwd )"
      cd "${directory}" && bash "${LICENSE_PULLER_PATH}"
    done
  else
    ( cd "${CWD}" && bash "${LICENSE_PULLER_PATH}" ) || true
  fi
}

function mergeLicenses() {
  if [ "${#DIRS_TO_PULLING[@]}" -ne 0 ] && [ ! -z "${DIRS_TO_PULLING}" ]; then
    for d in "${DIRS_TO_PULLING[@]}"; do
      local directory="$( cd "${CWD}/${d}" && pwd )"
      echo "Merging licenses from ${directory} to ${ROOT_DIR}"
      cp -R "${directory}/${LICENSE_PATH}/" "${ROOT_DIR}/${LICENSE_PATH}/"
    done
  else
    if [ "${FETCH_ROOT_LICENSES}" == true ]; then
      echo "Merging licenses from ${CWD} to ${ROOT_DIR}"
      cp -R "${CWD}/${LICENSE_PATH}/" "${ROOT_DIR}/${LICENSE_PATH}/"
    fi
  fi
}

function copyLicenseFile() {
  if [ "${FETCH_ROOT_LICENSES}" == true ]; then
    rm -rf "${CWD}/${LICENSE_PATH}/" || true
    cp -R "${ROOT_DIR}/${LICENSE_PATH}/" "${CWD}/${LICENSE_PATH}"
  fi
}

function main() {
  read_arguments "${ARGS[@]}"

  gatherRootLicenses
  gatherAppLicenses || true
  mergeLicenses
  copyLicenseFile
}

main
