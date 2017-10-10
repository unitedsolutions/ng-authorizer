import { Router, ActivatedRoute } from '@angular/router';
import { DataState } from 'ng-data-state';
import { Notifier } from 'ng-notifier';
export declare class DeleteComponent {
    private route;
    private dataState;
    private router;
    private notifier;
    constructor(route: ActivatedRoute, dataState: DataState, router: Router, notifier: Notifier);
    ngOnInit(): Promise<void>;
}
