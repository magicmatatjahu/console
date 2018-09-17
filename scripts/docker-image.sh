#!/usr/bin/env bash

# variables
APP_NAME=
CI=

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
mkdir react-components
cp ../components/react/lib/index.js ./react-components/index.js

# prepare image of app
if [ CI == true ]; then
    docker build -t ${APP_NAME} . --build-arg react-components=true
else
    docker build -t ${APP_NAME} .
fi
