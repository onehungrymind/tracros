import 'core-js';
import 'zone.js/dist/zone';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './src/app';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

bootstrap(App, [
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: 'AIzaSyAOgRvjxd6ULL0paq_I-zI20FdbZjk0e6g',
    authDomain: 'tracros.firebaseapp.com',
    databaseURL: 'https://tracros-d0325.firebaseio.com/',
    storageBucket: '',
  })
]);
