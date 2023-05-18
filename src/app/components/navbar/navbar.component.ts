import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  take,
} from 'rxjs';
import { CoreService } from 'src/app/core/core.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  search: any = '';
  searchUpdate = new Subject<string>();
  isShowProfile = false;

  constructor(
    private router: Router,
    private store: Store,
    private coreService: CoreService,

  ) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
