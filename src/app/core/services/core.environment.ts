import { ChangeDetectorRef, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoreEnvironmentService {
    public environment = environment;
    constructor() {
    }
    public get() {
        return environment;
    }
}
