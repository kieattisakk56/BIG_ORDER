import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { timeout, retry, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CoreService } from '../core.service';
import { profileFeature } from '../states/profile/profile.reducer';

@Injectable({
  providedIn: 'root',
})
export class CoreHttpService {
  private timeoutTime = 30000;
  private retry = 2;
  private hospital = ''
  constructor(private http: HttpClient, private coreService: CoreService, private store: Store) {
    this.store.select(profileFeature.selectProfileState).subscribe(((res: any) => {
      this.hospital = res.client_id;
    }));

  }

  async setHeader() {
    const profile = await this.coreService.services.storage.getIdentity();
    const user = await this.coreService.services.storage.getIdentity();
    let id = await this.coreService.services.storage.getMenu();

    const header = {
      Accept: 'application/json',
      code: 'ida',
      Authorization: `${profile.token_type} ${profile.access_token}`,
    };

    return new HttpHeaders(header);
  }

  async get(
    url: string,
    params?: any,
    headers?: HttpHeaders,
    endpoint: any = null
  ): Promise<any> {

    url = url.replaceAll('{code}', this.hospital);

    if (params) {
      const keys = Object.keys(params);
      for (const key of keys) {
        if (params[key] === undefined) delete params[key];
      }
    }

    url += this.jsonToQueryString(params);

    return headers
      ? this.http
        .get(
          this.coreService.services.environment.environment.api_service
            .domain + url,
          { headers }
        )
        .pipe(timeout(this.timeoutTime), retry(this.retry))
        .toPromise()
      : this.http
        .get(
          this.coreService.services.environment.environment.api_service
            .domain + url,
          {
            headers: await this.setHeader(),
          }
        )
        .pipe(timeout(this.timeoutTime), retry(this.retry))
        .toPromise();
  }

  async post(url: string, body?: any, headers?: HttpHeaders) {
    url = url.replaceAll('{code}', this.hospital);


    return headers
      ? this.http
        .post(
          this.coreService.services.environment.environment.api_service
            .domain + url,
          body,
          { headers }
        )
        .pipe(timeout(this.timeoutTime), retry(this.retry))
        .toPromise()
      : this.http
        .post(
          this.coreService.services.environment.environment.api_service
            .domain + url,
          body,
          {
            headers: await this.setHeader(),
          }
        )
        .pipe(timeout(this.timeoutTime), retry(this.retry))
        .toPromise();
  }

  async authen(url: string, body?: any, headers?: HttpHeaders) {
    url = url.replaceAll('{code}', this.hospital);


    return this.http
      .post(url, body, { headers })
      .pipe(timeout(this.timeoutTime), retry(this.retry))
      .toPromise();
  }

  async getDownload(url: string, body: any, name?: string): Promise<any> {
    this.coreService.services.toast.info('กำลังโหลดเอกสาร');
    url = url.replaceAll('{code}', this.hospital);


    this.http
      .post(
        this.coreService.services.environment.environment.api_service.domain +
        url,
        body,
        {
          observe: 'response',
          responseType: 'blob' as 'json',
          headers: await this.setHeader(),
        }
      )
      .subscribe(
        async (response) => {
          this.coreService.services.toast.success('โหลดเอกสารเรียบร้อย');
          const contentDisposition: any = response.headers.get(
            'content-disposition'
          );
          let filename = '';
          if (
            contentDisposition &&
            contentDisposition.indexOf('attachment') !== -1
          ) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(contentDisposition);
            if (matches != null && matches[1]) {
              filename = matches[1].replace(/['"]/g, '');
            }
          }
          await this.downLoadFile(response.body, filename);
        },
        (error) => {
          this.coreService.services.toast.error('ไม่สามารถโหลดเอกสารได้');
        }
      );
  }

  async downLoadFile(data: any, name: string) {
    var a = document.createElement('a');
    document.body.appendChild(a);
    let url = window.URL.createObjectURL(data);
    url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  jsonToQueryString(body: any) {
    return body
      ? '?' +
      Object.keys(body)
        .map((key: any) => {
          return (
            encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
          );
        })
        .join('&')
      : '';
  }
}
