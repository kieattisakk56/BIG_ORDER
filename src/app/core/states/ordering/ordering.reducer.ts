import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { orderingAction } from './ordering.actions';



export const orderingFeatureKey = 'ordering';
export interface State {
  menus: any[];
  count: number,
  price: number
}

export const initialState: State = {
  menus: [],
  count: 0,
  price: 0
}

export const orderingFeature = createFeature({
  name: orderingFeatureKey,
  reducer: createReducer(
    initialState,
    on(orderingAction.patchstate, (state, { data }) => ({
      ...state,
      menus: data
    }),
    ),
    on(orderingAction.patchcount, (state, { data }) => ({
      ...state,
      count: data
    })),
    on(orderingAction.clearstate, (state) => ({
      ...state,
      count: 0,
      menus: []
    })),
  ),
});
export const {
  name, // feature name
  reducer, // feature reducer
  selectOrderingState,
  selectCount,
  selectMenus,
  selectPrice
} = orderingFeature;
