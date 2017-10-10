var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataState } from 'ng-data-state';
import { Notifier } from 'ng-notifier';
import pause from '../_lib/pause';
import { successConfigs } from '../_lib/notifier-configs';
var DeleteComponent = /** @class */ (function () {
    function DeleteComponent(route, dataState, router, notifier) {
        this.route = route;
        this.dataState = dataState;
        this.router = router;
        this.notifier = notifier;
    }
    DeleteComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, outletAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = this.route.snapshot.params.id;
                        outletAddress = ['/roles', { outlets: { empty: null } }];
                        this.dataState.getResource('roles').delete({ data: { _id: id } });
                        this.notifier.send('roles-messager', __assign({ message: 'The role was deleted' }, successConfigs));
                        return [4 /*yield*/, pause()];
                    case 1:
                        _a.sent();
                        this.router.navigate(outletAddress, { skipLocationChange: true, replaceUrl: true });
                        this.router.navigateByUrl('/roles/list', { replaceUrl: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    DeleteComponent.decorators = [
        { type: Component, args: [{ template: '' },] },
    ];
    /** @nocollapse */
    DeleteComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
        { type: DataState, },
        { type: Router, },
        { type: Notifier, },
    ]; };
    return DeleteComponent;
}());
export { DeleteComponent };
//# sourceMappingURL=delete.component.js.map