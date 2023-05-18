import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class CoreStatusService {

    approvalStatus(status: number, text: string) {
        switch (status) {
            case 1:
                return `<span class="active badge badge-light-warning"> ${text} </span>`;
            case 2:
                return `<span class="active badge badge-light-success"> ${text} </span>`;
            default:
                return;
        }
    }
}