import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { orderingAction } from "../states/ordering/ordering.actions";

@Injectable({
    providedIn: 'root'
})
export class CoreOrderingService {
    orders: any = [];
    constructor(private store: Store) {
    }

    public update(menu: any) {
        const index = this.orders.findIndex((obj: any) => {
            return obj.id == menu.id;
        });
        if (index != -1) {
            this.orders[index] = menu;
        } else {
            this.orders.push(menu)
        }
        const selected = this.orders.filter((resp: any) => {
            return resp.value > 0;
        })
        this.store.dispatch(orderingAction.patchstate(structuredClone(selected)));
    }
}
