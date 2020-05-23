import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HttpClientModule} from '@angular/common/http';
import {ProjectsComponent} from './components/project/projects/projects.component';
import {HeaderComponent} from './layout/header/header.component';
import {AddProjectComponent} from './components/project/add-project/add-project.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ManageProjectComponent} from './components/project/manage-project/manage-project.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    HeaderComponent,
    AddProjectComponent,
    ManageProjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: ['http://localhost:8080']
      }
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
