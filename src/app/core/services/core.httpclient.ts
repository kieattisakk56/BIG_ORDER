import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoreHttpService {
  private timeoutTime = 30000;
  private retry = 2;
  constructor(private http: HttpClient) {}
  async get(url: string, headers?: HttpHeaders): Promise<any> {
    return headers
      ? this.http
          .get(url, { headers })
          .pipe(timeout(this.timeoutTime), retry(this.retry))
          .toPromise()
      : this.http
          .get(url)
          .pipe(timeout(this.timeoutTime), retry(this.retry))
          .toPromise();
  }

  async post(url: string, body: any, headers?: HttpHeaders) {
    return headers
      ? this.http
          .post(url, body, { headers })
          .pipe(timeout(this.timeoutTime), retry(this.retry))
          .toPromise()
      : this.http
          .post(url, body)
          .pipe(timeout(this.timeoutTime), retry(this.retry))
          .toPromise();
  }

  async put(url: string, body: any, headers?: HttpHeaders) {
    return headers
      ? this.http
          .put(url, body, { headers })
          .pipe(timeout(this.timeoutTime), retry(this.retry))
          .toPromise()
      : this.http
          .put(url, body)
          .pipe(timeout(this.timeoutTime), retry(this.retry))
          .toPromise();
  }

  async delete(url: string, headers?: HttpHeaders) {
    return headers
      ? this.http
          .delete(url, { headers })
          .pipe(timeout(this.timeoutTime), retry(this.retry))
          .toPromise()
      : this.http
          .delete(url)
          .pipe(timeout(this.timeoutTime), retry(this.retry))
          .toPromise();
  }

  async patch(url: string, body: any, headers?: HttpHeaders) {
    return headers
      ? this.http
          .patch(url, body, { headers })
          .pipe(timeout(this.timeoutTime), retry(this.retry))
          .toPromise()
      : this.http
          .patch(url, body)
          .pipe(timeout(this.timeoutTime), retry(this.retry))
          .toPromise();
  }
}
