#!/usr/bin/env bash

# variables
DOCS_COMPONENT_FOLDER="components/docs-component"
CWD=$PWD

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
npm run build

cd $CWD
