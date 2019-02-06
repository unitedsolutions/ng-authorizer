import { Injectable } from '@angular/core';
import { DataState } from 'ng-data-state';
var RolesDataResolverService = /** @class */ (function () {
    function RolesDataResolverService(dataState) {
        this.dataState = dataState;
    }
    RolesDataResolverService.prototype.resolve = function () {
        return this.dataState.createResource({ name: 'roles' });
    };
    RolesDataResolverService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RolesDataResolverService.ctorParameters = function () { return [
        { type: DataState, },
    ]; };
    return RolesDataResolverService;
}());
export { RolesDataResolverService };
//# sourceMappingURL=roles-data-resolver.service.js.map