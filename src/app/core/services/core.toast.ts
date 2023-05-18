import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class CoreToastService {
    toast: ToastrService;
    constructor(
        private toastr: ToastrService
    ) {
        this.toast = this.toastr;
    }
    public info(message: any) {
        this.toast.info(message);
    }
    public success(message: any) {
        this.toast.success(message);
    }
    public error(message: any) {
        this.toast.warning(message);
    }
    public checkStatus() {
        return this.toast.currentlyActive;
    }


}
