import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {JwtHelperService} from '@auth0/angular-jwt';

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
    return this.oauthService.logOut();
  }
}
