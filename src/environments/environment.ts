// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  root: 'http://localhost:8080/api/',
  api_service: {
    domain: `http://localhost:8080/api`
  },
  auth_service: {
    domain: 'https://humantix.cloud/ida_auth/',
  },
  googleMapApiKey: '',
  version: '1.0.002',
  config_table: {
    page: 1,
    pageSize: 10
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
