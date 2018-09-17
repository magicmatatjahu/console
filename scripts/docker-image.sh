#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
INVERTED='\033[7m'
NC='\033[0m' # No Color

# arguments
APP_NAME=
CI=

# variables
REACT_COMPONENTS="react-components"
CWD=$PWD

# read arguments
while test $# -gt 0; do
    case "$1" in
        --app-name | --app)
            shift
            APP_NAME=$1
            shift
            ;;
        --cont-integration | --ci)
            shift
            CI=$1
            shift
            ;;
        *)
            echo "$1 is not a recognized flag!"
            exit 1;
            ;;
    esac
done

# prepare react-components
cd ../components/react
npm install
npm run build

cd $CWD

# copy lib index.js for DOCKERFILE
mkdir $REACT_COMPONENTS
cp ../components/react/lib/index.js ./${REACT_COMPONENTS}/index.js

# prepare image of app
if [ -z "$CI" ] && [ -n "$APP_NAME" ]; then
    docker build -t ${APP_NAME} .
    rm -rf $REACT_COMPONENTS
fi
