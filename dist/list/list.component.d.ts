import { Router } from '@angular/router';
import { Guardian } from 'ng-guardian';
import { DataState } from 'ng-data-state';
import { Notifier } from 'ng-notifier';
export declare class ListComponent {
    private dataState;
    private notifier;
    private guardian;
    private router;
    roles: any[];
    remover: any;
    changer: any;
    adder: any;
    publisher: any;
    private messager;
    constructor(dataState: DataState, notifier: Notifier, guardian: Guardian, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
