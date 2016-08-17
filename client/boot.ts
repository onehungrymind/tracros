import 'core-js';
import 'zone.js/dist/zone';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {App} from './src/app';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

bootstrap(App, [
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: 'AIzaSyAOgRvjxd6ULL0paq_I-zI20FdbZjk0e6g',
    authDomain: 'tracros.firebaseapp.com',
    databaseURL: 'https://tracros-d0325.firebaseio.com//',
    storageBucket: '',
  }),
  HTTP_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
