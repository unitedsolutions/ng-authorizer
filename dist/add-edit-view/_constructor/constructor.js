import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guardian } from 'ng-guardian';
import { HttpClientPlus } from 'ng-http-client-plus';
import { DataState } from 'ng-data-state';
import { Notifier } from 'ng-notifier';
var AddEditViewComponent = /** @class */ (function () {
    function AddEditViewComponent(guardian, http, dataState, route, notifier) {
        this.guardian = guardian;
        this.http = http;
        this.dataState = dataState;
        this.route = route;
        this.notifier = notifier;
    }
    AddEditViewComponent.decorators = [
        { type: Component, args: [{
                    template: "\n    <h1 class = \"mt-4\">{{view?.title}}</h1>\n    <form #f = \"ngForm\" novalidate>\n      <p class = \"ng-roles-section-title\">\n        <strong>Role Information</strong>\n      </p>\n      <input type = \"hidden\" name = \"_id\" ngModel />\n      <div class=\"form-group row\">\n        <label class=\"col col-md-auto col-form-label\">Role Name: </label>\n        <div class=\"col-4\">\n          <input class=\"form-control\" type=\"text\" name = \"roleName\" ngModel \n          required autocomplete = \"off\" [disabled] = \"view?.inputDisabled\">\n        </div>\n      </div>\n      <div class = \"form-group row\">\n        <label class=\"col col-md-auto col-form-label\">Role Description: </label>\n        <div class=\"col-4\">\n          <input class=\"form-control\" type=\"search\" name = \"roleDescription\" \n          ngModel required autocomplete = \"off\" [disabled] = \"view?.inputDisabled\">\n        </div>\n      </div>\n      <p class = \"ng-roles-section-title\">\n        <strong>Role Actions</strong>\n      </p>\n      <table class = \"table mt-4\" [ngClass] = \"{'table-hover': !view?.isView}\">\n        <thead>\n          <tr>\n            <th class = \"text-center\"><span class = \"fa\" \n            [ngClass] = \"circleClass(routes.selected)\" \n            (click) = \"toggleAll()\"></span></th>\n            <th>Module</th>\n            <th>Application</th>\n            <th>Route</th>\n            <th class = \"text-center\">Default</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor = \"let route of routes\">\n            <td class = \"text-center\">\n              <span class = \"fa\" [ngClass] = \"circleClass(route.selected)\" \n              (click) = \"toggler(route)\"></span>\n            </td>\n            <td>{{route.parent}}</td>\n            <td>{{route.label}}</td>\n            <td>{{route.path}}</td>\n            <td class = \"text-center\">\n              <span class = \"fa\" [ngClass] = \"circleClass(route.default)\" \n              (click) = \"defaulter(route)\"></span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      <div class = \"mt-4\">\n        <button *ngIf = \"!view?.isView\" class = \"btn btn-primary\" \n        (click) = \"sendData()\" [disabled] = \"f.invalid || !selectedRoutes?.length\">\n          <strong>{{view?.submitButtonTitle}}</strong>\n        </button>\n        <button type = \"button\" class = \"btn btn-secondary ml-2\" \n        routerLink = \"/roles/list\">\n          <strong>{{view?.cancelButtonTitle}}</strong>\n        </button>    \n      </div>\n    </form>\n  ",
                    styles: ["\n    .fa {\n      font-size: 20px;\n    }\n    input[disabled] {\n      background-color: #fff;\n      cursor: default;\n    }\n    .cursor-hand {\n      cursor: pointer;\n    }\n    .cursor-default {\n      cursor: default;\n    }\n    label {\n      width: 155px;\n    }\n    .ng-roles-section-title {\n      margin: 25px 0 20px;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    AddEditViewComponent.ctorParameters = function () { return [
        { type: Guardian, },
        { type: HttpClientPlus, },
        { type: DataState, },
        { type: ActivatedRoute, },
        { type: Notifier, },
    ]; };
    AddEditViewComponent.propDecorators = {
        'form': [{ type: ViewChild, args: ['f',] },],
    };
    return AddEditViewComponent;
}());
export { AddEditViewComponent };
//# sourceMappingURL=constructor.js.map