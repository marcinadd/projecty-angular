import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  getFileAsBlob(url: string) {
    return this.http.get(url, {responseType: 'blob'});
  }
}
