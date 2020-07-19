import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Settings} from '../models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  apiSettingssUrl = environment.apiUrl + '/settings';

  constructor(private http: HttpClient) {
  }

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(this.apiSettingssUrl);
  }

  patchSettings(patchedSettings: Settings): Observable<Settings> {
    return this.http.patch<Settings>(this.apiSettingssUrl, patchedSettings, environment.httpOptions);
  }
}
