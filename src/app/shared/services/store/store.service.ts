import { Injectable } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  path: string = '/store/';
  constructor(private coreService: CoreService) {

  }

  async get(body: any): Promise<any> {
    const endpoint = this.path + `getCetegoryMenu`;
    return this.coreService.services.http.post(endpoint, body);
  }
}
