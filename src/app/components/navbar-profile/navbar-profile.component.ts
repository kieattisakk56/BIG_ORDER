import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { profileFeature } from 'src/app/core/states/profile/profile.reducer';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})
export class NavbarProfileComponent implements OnInit {
  profile$: Observable<any> = this.store.select(profileFeature.selectProfileState);
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
