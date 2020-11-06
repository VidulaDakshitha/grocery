/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebaseConfig : {
    apiKey: 'AIzaSyBMopZkCax7NzCfYuCECId9qXVYf5ADev4',
    authDomain: 'grocery-edee1.firebaseapp.com',
    databaseURL: 'https://grocery-edee1.firebaseio.com',
    projectId: 'grocery-edee1',
    storageBucket: 'grocery-edee1.appspot.com',
    messagingSenderId: '822216146893',
    appId: '1:822216146893:web:bea1422374f9557f444e84',
  },
};
