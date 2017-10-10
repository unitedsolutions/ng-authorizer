import * as _ from 'lodash';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Guardian } from 'ng-guardian';
import { DataState } from 'ng-data-state';
import { Notifier } from 'ng-notifier';
var ListComponent = /** @class */ (function () {
    function ListComponent(dataState, notifier, guardian, router) {
        this.dataState = dataState;
        this.notifier = notifier;
        this.guardian = guardian;
        this.router = router;
        this.roles = [];
    }
    ListComponent.prototype.messager = function (message) {
        this.notifier.send('roles-messager', {
            message: message,
            classes: {
                container: 'mt-4',
                notifier: 'alert alert-warning',
                icon: 'fa fa-warning'
            },
            activeTime: 2500
        });
    };
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var resource = this.dataState.getResource('roles');
        this.publisher = resource.onPublish().subscribe(function (roles) {
            _.extend(_this, { roles: roles });
        });
        this.remover = resource.onDelete().subscribe(function () {
            _this.messager('One of the records was deleted');
        });
        this.changer = resource.onUpdate().subscribe(function (record) {
            _this.messager('One of the records was changed');
        });
        this.adder = resource.onAdd().subscribe(function (record) {
            _this.messager('A new record was added');
        });
    };
    ListComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        ['publisher', 'remover', 'changer', 'adder'].forEach(function (type) {
            _this[type].complete();
        });
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    template: "\n    <h1 class = \"mt-4\">Roles</h1>\n    <div class = \"controls mt-4\">\n      <button class = \"btn btn-primary\" routerLink = \"/roles/add\">\n        <strong>Add New Role</strong>\n      </button>\n    </div>\n    <table class = \"table mt-4\" [ngClass] = \"{'table-hover': roles.length}\" >\n      <thead *ngIf = \"roles.length\">\n        <tr>\n          <th>Role Name</th>\n          <th>Role Description</th>\n          <th class = \"text-center\">Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor = \"let role of roles\">\n          <td>{{role.roleName}}</td>\n          <td>{{role.roleDescription}}</td>\n          <td class = \"text-center\">\n            <button class = \"btn btn-secondary btn-sm\" [disabled] = \"!role._id\" \n            [routerLink] = \"['/roles/view/', role._id]\">\n              <span class = \"fa fa-eye\"></span>\n            </button>\n            <button class = \"btn btn-warning btn-sm\" [disabled] = \"!role._id\"\n            [routerLink] = \"['/roles/edit/', role._id]\">\n              <span class = \"fa fa-edit\"></span>\n            </button>\n            <button class = \"btn btn-danger btn-sm\" [disabled] = \"!role._id || role.users\"\n            [routerLink] = \"['/roles', {outlets: {empty: ['delete', role._id]}}]\"\n            skipLocationChange>\n              <span class = \"fa fa-times-circle-o\"></span>\n            </button>\n          </td>\n        </tr>\n        <tr *ngIf = \"!roles.length\">\n          <td colspan = \"3\" class = \"text-center text-muted\">\n            <strong>No roles in the database</strong>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  "
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: DataState, },
        { type: Notifier, },
        { type: Guardian, },
        { type: Router, },
    ]; };
    return ListComponent;
}());
export { ListComponent };
//# sourceMappingURL=list.component.js.map