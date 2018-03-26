/* @flow */

/* eslint-disable key-spacing */
import path from 'path';
import fs from 'fs';

import favicons from 'favicons';

let source = path.resolve(__dirname, '../assets/svg/Favicon.svg');
// let source = '../assets/svg/Favicon.svg';

const configuration = {
  developerURL: null,             // Your (or your developer's) URL. `string`
  background: '#fff',             // Background colour for flattened icons. `string`
  path: 'favicons/',                      // Path for overriding default icons path. `string`
  display: 'standalone',          // Android display: 'browser' or 'standalone'. `string`
  orientation: 'portrait',        // Android orientation: 'portrait' or 'landscape'. `string`
  start_url: '/?homescreen=1',    // Android start application's URL. `string`
  version: '1.0',                 // Your application's version number. `number`
  logging: true,                 // Print logs to console? `boolean`
  online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
  preferOnline: false,            // Use offline generation, if online generation has failed. `boolean`
  pipeHTML: false,
  html: 'index.html',
  icons: {
    android: false,              // Create Android homescreen icon. `boolean`
    appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset: offsetInPercentage }`
    appleStartup: true,         // Create Apple startup images. `boolean`
    coast: {
      offset: 25, // Create Opera Coast icon with offset 25%. `boolean` or `{ offset: offsetInPercentage }`
    },
    favicons: true,             // Create regular favicons. `boolean`
    firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset: offsetInPercentage }`
    windows: true,              // Create Windows 8 tile icons. `boolean`
    yandex: true,                // Create Yandex browser icon. `boolean`
  },
};

favicons(source, configuration, (err, response): void => {
  if (err != null) {
    console.log(err.status);  // HTTP error code (e.g. `200`) or `null`
    console.log(err.name);    // Error name e.g. 'API Error'
    console.log(err.message); // Error description e.g. 'An unknown error has occurred'
    return;
  }

  function writeToAssets(obj: Object): Promise<any> {
    return new Promise((resolve: Function, reject: Function): void => {
      fs.writeFile(path.resolve(__dirname, `../assets/favicons/${obj.name}`), obj.contents, (err: ?Error): void => {
        if (err != null) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  let promise = Promise.resolve(true);

  for (let elt of response.images) {
    promise = promise.then((): Promise<any> => {
      return writeToAssets(elt);
    });
  }

  for (let elt of response.files) {
    promise = promise.then((): Promise<any> => {
      return writeToAssets(elt);
    });
  }
  // console.log(response.images);   // Array of { name: string, contents: <buffer> }
  // console.log(response.files);    // Array of { name: string, contents: <string> }
  // console.log(response.html);     // Array of strings (html elements)
});
/* eslint-enable key-spacing */
