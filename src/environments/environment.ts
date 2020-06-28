// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {AuthConfig} from 'angular-oauth2-oidc';
import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  chatUrl: 'http://localhost:8080/secured/room',
  notificationsUrl: 'http://localhost:8080/secured/notifications',
  subscribeUserEndpoint: '/secured/user/queue/specific-user',
  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  },
  authConfig: new AuthConfig({
    issuer: 'http://localhost:8081/auth/realms/Projecty',
    redirectUri: window.location.origin,
    clientId: 'sso-client',
    responseType: 'code',
    scope: 'profile email offline_access',
    showDebugInformation: true,
    requireHttps: false,
    useSilentRefresh: true
  }),
  message_buffer: 10
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
