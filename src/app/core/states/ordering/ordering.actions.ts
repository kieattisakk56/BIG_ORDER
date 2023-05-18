import { createActionGroup, emptyProps } from '@ngrx/store';




export const orderingAction = createActionGroup({
  source: 'ordering',
  events: {
    loadMenu: emptyProps(),
    patchState: (data: any) => ({ data }),
    patchCount: (data: any) => ({ data }),
    clearState: emptyProps(),
    initial: emptyProps(),
  },
});

