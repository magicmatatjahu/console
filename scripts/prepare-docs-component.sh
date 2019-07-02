#!/usr/bin/env bash

# arguments
TEMP_FOLDER=

# variables
REACT_COMPONENTS_FOLDER="components/react"
DOCS_COMPONENT_FOLDER="components/docs-component"
CWD=$PWD

function prepare_react_components() {
    # prepare react-components
    cd $CWD
    cd ../${REACT_COMPONENTS_FOLDER}
    npm install
    npm run build

    cd $CWD

    # copy lib for DOCKERFILE
    rm -rf ../${DOCS_COMPONENT_FOLDER}/node_modules/@kyma-project/react-components/lib/index.js
    cp ../${REACT_COMPONENTS_FOLDER}/lib/index.js ../${DOCS_COMPONENT_FOLDER}/node_modules/@kyma-project/react-components/lib/index.js
}

# read arguments
while test $# -gt 0; do
    case "$1" in
        --temp-folder | -d)
            shift
            TEMP_FOLDER=$1
            shift
            ;;
        *)
            echo "$1 is not a recognized flag!"
            exit 1;
            ;;
    esac
done

# prepare 
cd ../${DOCS_COMPONENT_FOLDER}
npm install
prepare_react_components

cd $CWD
cd ../${DOCS_COMPONENT_FOLDER}
npm run build

cd $CWD
# # copy lib for DOCKERFILE
mkdir $TEMP_FOLDER
cp -R ../${DOCS_COMPONENT_FOLDER}/lib ./${TEMP_FOLDER}
