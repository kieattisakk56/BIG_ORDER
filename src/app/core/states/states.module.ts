import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProfile from './profile/profile.reducer';
import { OrderingEffects } from './ordering/ordering.effects';
import * as fromOrdering from './ordering/ordering.reducer';

// export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
//   return function (state: any, action: any) {
//     // console.log('state', state);
//     // console.log('action', action);

//     return reducer(state, action);
//   };
// }

// export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forFeature([ OrderingEffects]),
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    StoreModule.forFeature(fromOrdering.orderingFeatureKey, fromOrdering.reducer)
  ],
})
export class StatesModule { }
