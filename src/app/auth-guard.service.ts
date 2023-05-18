import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CoreService } from './core/core.service';

@Injectable()
export class AuthGuardService {
  constructor(private router: Router, private coreService: CoreService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // let url: string = state.url;
    // var profile = await this.coreService.services.storage.getIdentity();
    
    // if (profile) {
    //   if (url.includes('login')) {
    //     this.router.navigateByUrl('expertise');
    //   }
    // } else {
    //   if (url.includes('login')) {
    //     return true;
    //   } else {
    //     this.router.navigateByUrl('login');
    //   }
    // }
    return true; // คืนค่าการตรวจสอบสถานะการล็อกอิน
  }


}
