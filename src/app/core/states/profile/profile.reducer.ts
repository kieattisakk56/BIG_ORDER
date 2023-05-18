import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { ProfileActions } from './profile.actions';

export const profileFeatureKey = 'profile';

interface State { }

const initialState: State = {

};

export const profileFeature = createFeature({
  name: profileFeatureKey,

  reducer: createReducer(
    initialState,
    on(ProfileActions.initialuserprofile, (state, { data }) => ({
      ...data
    })
    ),

  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectProfileState,
} = profileFeature;
