import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit(): void {
    this.oauthService.initLoginFlow();
    this.oauthService.configure(environment.authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
