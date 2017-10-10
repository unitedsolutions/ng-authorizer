export default {
  input: 'dist/ng-authorizer.js',
  name: 'ngAuthorizer',
  output: {
    file: 'dist/ng-authorizer.umd.js',
    format: 'umd'
  },
  sourceMap: false,
  globals: {
    'lodash': '_',
    'ng-data-state': 'ngDataState',
    'ng-notifier': 'ngNotifier',
    'ng-http-client-plus': 'ngHttpClientPlus',
    'ng-guardian': 'ngGuardian',
    '@angular/common': 'ng.common',
    '@angular/core': 'ng.core',
    '@angular/router': 'ng.router',
    '@angular/forms': 'ng.forms'
  },
  external: [
    'lodash',
    'ng-data-state',
    'ng-notifier',
    'ng-http-client-plus',
    'ng-guardian',
    '@angular/core',
    '@angular/common',
    '@angular/router',
    '@angular/forms'
  ]  
};
