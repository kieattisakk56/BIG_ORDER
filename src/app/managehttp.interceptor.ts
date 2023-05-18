import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';
import { CoreService } from './core/core.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ManagehttpInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private core: CoreService,
    private toastr: ToastrService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    this.core.services.loading.setLoading(true, req);
    // console.log(req)
    // // replace httpclient
    // const httpRequest = new HttpRequest(<any>req.method, req.url.replaceAll('{{code}}', this.core.services.environment.environment.comcode));
    // req = Object.assign(req, httpRequest);

    // console.log(req)


    // const dupReq = req.clone({
    //   headers: req.headers.set('Consumer-Secret', 'some sample key'),
    // });
    return next
      .handle(req)
      .pipe(
        catchError((error: HttpErrorResponse): any => {
          this.core.services.loading.setLoading(false, req);
          switch (error.status) {
            case 0:
              break;
            case 400:
              this.handleError(error);
              break;
            case 401:
              this.handleError(error);
              break;
            case 403:
              this.handleError(error);
              break;
            case 404:
              this.handleError(error);
              break;
            case 405:
              this.handleError(error);
              break;
            case 406:
              this.handleError(error);
              break;
            case 409:
              this.handleError(error);
              break;
            case 500:
              this.handleError(error);
              break;
          }
          return throwError(error?.error);
        })
      )
      .pipe(
        map<any, any>((evt) => {

          if (evt instanceof HttpResponse) {
            this.core.services.loading.setLoading(false, req);
          }
          return evt;
        })
      );
  }

  setheader(req: HttpRequest<any>): any {
    return this.core.services.storage.getIdentity().then((resp: any) => {
      const headers = {};

      if (!req.url.includes('connect/token')) {
        const headers = {
          Authorization: `${resp.authen.token_type} ${resp.authen.access_token}`,
        };
        req = req.clone({ setHeaders: headers });
      }
      return req;
    });
  }

  async handleError(error: any) {
    if (this.toastr.currentlyActive == 0) {
      console.log(error)
      this.toastr.warning(
        this.errorMessageHandle(error.error),
      );
    }
    // if (!this.core.services.toast.checkStatus()) {
    //   this.core.services.toast.error(error.error.message);
    // }
  }

  errorMessageHandle(message: any) {
    switch (message.error_description) {
      case "User has been temporarily suspended.":
        return message.MessageAlt;
      default:
        return "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
    }
  }
}
