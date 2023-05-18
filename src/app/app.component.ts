import { Component, HostListener, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject, debounceTime, filter, map, Observable } from 'rxjs';
import { CoreService } from './core/core.service';
import { ProfileActions } from './core/states/profile/profile.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  is_reload_page = true;
  constructor() {
    // this.store.dispatch(ProfileActions.loadProfile());
    setTimeout(() => {
      this.is_reload_page = false;
    }, 1800);

  }
}
