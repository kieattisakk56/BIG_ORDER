import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root',
})
export class CoreLayoutService {
  constructor(
    private router: Router,
    private titleService: Title,
    private coreService: CoreService
  ) {}
}
