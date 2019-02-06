import { Component } from '@angular/core';
var RolesComponent = /** @class */ (function () {
    function RolesComponent() {
    }
    RolesComponent.decorators = [
        { type: Component, args: [{
                    template: "\n    <div class = \"container\">\n      <ng-simple-notifier address = \"roles-messager\"></ng-simple-notifier>\n      <ng-actions-notifier address = \"roles-actioner\"></ng-actions-notifier>\n      <router-outlet name = \"empty\"></router-outlet>\n      <router-outlet></router-outlet>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    RolesComponent.ctorParameters = function () { return []; };
    return RolesComponent;
}());
export { RolesComponent };
//# sourceMappingURL=roles.component.js.map