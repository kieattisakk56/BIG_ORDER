import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

export const ProfileActions = createActionGroup({
  source: 'user_profile',
  events: {
    initialUserProfile: (data: any) => ({ data }),
    clear: emptyProps(),
  },
});
