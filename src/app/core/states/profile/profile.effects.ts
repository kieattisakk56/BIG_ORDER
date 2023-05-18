import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CoreService } from '../../core.service';
import { ProfileActions } from './profile.actions';

@Injectable()
export class ProfileEffects {
  params = {
    page: 1,
    pageSize: 10,
  };

  constructor(
    private actions$: Actions,
    private coreService: CoreService,
    private store: Store
  ) { }

  load$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.initialuserprofile),
        map(async () => {
          const user = await this.coreService.services.storage.getUser();
          this.store.dispatch(ProfileActions.initialuserprofile(user));
          console.log(user)
        })
      ),
    { dispatch: false }
  );
}
