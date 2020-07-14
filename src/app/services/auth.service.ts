import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) {
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  getUsername() {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.oauthService.getIdToken()).preferred_username;
  }

  logOut() {
    this.oauthService.revocationEndpoint = environment.authConfig.revocationEndpoint;
    return this.oauthService.logOut();
  }
}
