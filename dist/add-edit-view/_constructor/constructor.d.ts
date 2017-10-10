import { ActivatedRoute } from '@angular/router';
import { Guardian } from 'ng-guardian';
import { HttpClientPlus } from 'ng-http-client-plus';
import { DataState } from 'ng-data-state';
import { Notifier } from 'ng-notifier';
export declare class AddEditViewComponent {
    private guardian;
    private http;
    private dataState;
    private route;
    private notifier;
    view: any;
    routes: any;
    httpMethod: any;
    originalRoutes: any;
    selectedRoutes: any;
    setState: any;
    resource: any;
    _id: any;
    remover: any;
    changer: any;
    form: any;
    constructor(guardian: Guardian, http: HttpClientPlus, dataState: DataState, route: ActivatedRoute, notifier: Notifier);
}
