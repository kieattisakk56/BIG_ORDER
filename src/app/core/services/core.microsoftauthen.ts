import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoreMicrosoftAuthenService {
  constructor() { }

  // async openMicrosoftAuthentication(appId?: any) {
  //   const endpoint = `
  //       https://login.microsoftonline.com/a0746c2e-942d-455a-83e4-26a96f7271bb/oauth2/v2.0/authorize?
  //       client_id=${encodeURI(environment.microsoft_authen.client_id)}
  //       &response_type=token&redirect_uri=${encodeURI(
  //         environment.microsoft_authen.redirectUri
  //       )}&response_mode=fragment
  //       &state=}
  //       &nonce=678910
  //       &scope=https%3A%2F%2Fgraph.microsoft.com%2Fuser.read
  //       `;
  //   window.open(endpoint, '_self');
  // }
}
