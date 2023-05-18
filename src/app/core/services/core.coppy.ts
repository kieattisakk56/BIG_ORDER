import { ChangeDetectorRef, Injectable } from '@angular/core';
import { CoreService } from '../core.service';


@Injectable({
    providedIn: 'root'
})
export class CoreCopyService {
    constructor(

    ) {

    }

    async copyText(message: any) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = message;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);

    }


}
