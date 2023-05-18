import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CoreService } from 'src/app/core/core.service';
import { loadingDTO } from 'src/app/core/services/core.loading';

import { ProfileActions } from 'src/app/core/states/profile/profile.actions';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  loading!: loadingDTO;

  version: any;
  year = new Date();

  constructor(private coreService: CoreService, private store: Store, private router: Router) {
    router.events.subscribe(async (val) => {
    });
  }

  async ngOnInit() {
    this.version = await this.coreService.services.environment.environment.version;
  }

 
}
