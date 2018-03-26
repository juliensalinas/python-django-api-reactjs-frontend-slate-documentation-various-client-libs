#!/bin/sh

CURRENT_PATH=$(dirname "$0")

PATH_BUILD="$CURRENT_PATH/../.build"
PATH_SRC="$CURRENT_PATH/../src"
PATH_ASSETS="$CURRENT_PATH/../assets"
FILES_TO_COPY="package.json .babelrc CHECKS Procfile nginx.conf.sigil"

rimraf $PATH_BUILD
babel-node ./node_modules/.bin/webpack --progress --config "$NODE_ENV.webpack.config.js"
babel $PATH_SRC -d $PATH_BUILD/src --ignore '__tests__'
cp $FILES_TO_COPY $PATH_BUILD
mkdir -p $PATH_BUILD/assets/jsx
babel $PATH_ASSETS/jsx/LayoutServer.jsx > $PATH_BUILD/assets/jsx/LayoutServer.js
mkdir -p $PATH_BUILD/assets/jsx
babel $PATH_ASSETS/jsx/settings.js > $PATH_BUILD/assets/jsx/settings.js
babel-node $CURRENT_PATH/layoutToHtml.js $PATH_BUILD/assets/manifest.json > $PATH_BUILD/index.html
