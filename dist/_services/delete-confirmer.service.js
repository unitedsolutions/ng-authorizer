import { Injectable } from '@angular/core';
import { Notifier } from 'ng-notifier';
var DeleteConfirmerService = /** @class */ (function () {
    function DeleteConfirmerService(notifier) {
        this.notifier = notifier;
    }
    DeleteConfirmerService.prototype.canActivate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.notifier.send('roles-actioner', {
                message: 'Are you sure you want to delete a role?',
                title: 'Delete role',
                classes: {
                    icon: 'fa fa-warning red-alert',
                    closer: 'fa fa-times-circle'
                },
                actions: [
                    {
                        label: 'Delete',
                        class: 'btn btn-danger',
                        callback: function () { return resolve(true); }
                    },
                    {
                        label: 'Cancel',
                        class: 'btn btn-secondary',
                        callback: function () { return resolve(); },
                        onClose: true
                    }
                ]
            });
        });
    };
    DeleteConfirmerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DeleteConfirmerService.ctorParameters = function () { return [
        { type: Notifier, },
    ]; };
    return DeleteConfirmerService;
}());
export { DeleteConfirmerService };
//# sourceMappingURL=delete-confirmer.service.js.map