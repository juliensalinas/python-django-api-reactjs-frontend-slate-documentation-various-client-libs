#!/bin/sh

CURRENT_PATH=$(dirname "$0")

PATH_BUILD="$CURRENT_PATH/../.build"
FILES_TO_RM="nginx.conf.sigil CHECKS Procfile .babelrc"

rm -rf $PATH_BUILD/src
rm -rf $PATH_BUILD/assets/jsx
mv $PATH_BUILD/assets/* $PATH_BUILD
rm -rf $PATH_BUILD/assets
cd $PATH_BUILD
rm $FILES_TO_RM
cd ..
