import { Notifier } from 'ng-notifier';
export declare class DeleteConfirmerService {
    private notifier;
    constructor(notifier: Notifier);
    canActivate(): Promise<{}>;
}
