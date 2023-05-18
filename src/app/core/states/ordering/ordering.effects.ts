import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { orderingAction } from './ordering.actions';
import { lastValueFrom, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { orderingFeature } from './ordering.reducer';



@Injectable()
export class OrderingEffects {


  constructor(
    private actions$: Actions,
    private store: Store
  ) { }

  load$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(orderingAction.patchstate),
        map(async (resp) => {
          let sum = 0;
          const data: any = structuredClone(await lastValueFrom(this.store.select(orderingFeature.selectMenus).pipe(take(1))));
          data.forEach((a: any) => sum += a.value);
          this.store.dispatch(orderingAction.patchcount(structuredClone(sum)));
        })
      ),

    { dispatch: false }
  );


  clear$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(orderingAction.initial),
        map(async (resp) => {
          this.store.dispatch(orderingAction.patchstate([]));
        })
      ),

    { dispatch: false }
  );
}
