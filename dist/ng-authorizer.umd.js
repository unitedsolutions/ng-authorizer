(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@angular/router'), require('lodash'), require('ng-guardian'), require('ng-data-state'), require('ng-notifier'), require('ng-http-client-plus')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@angular/common', '@angular/router', 'lodash', 'ng-guardian', 'ng-data-state', 'ng-notifier', 'ng-http-client-plus'], factory) :
	(factory((global.ngAuthorizer = {}),global.ng.core,global.ng.forms,global.ng.common,global.ng.router,global._,global.ngGuardian,global.ngDataState,global.ngNotifier,global.ngHttpClientPlus));
}(this, (function (exports,core,forms,common,router,_,ngGuardian,ngDataState,ngNotifier,ngHttpClientPlus) { 'use strict';

var RolesComponent = /** @class */ (function () {
    function RolesComponent() {
    }
    RolesComponent.decorators = [
        { type: core.Component, args: [{
                    template: "\n    <div class = \"container\">\n      <ng-simple-notifier address = \"roles-messager\"></ng-simple-notifier>\n      <ng-actions-notifier address = \"roles-actioner\"></ng-actions-notifier>\n      <router-outlet name = \"empty\"></router-outlet>\n      <router-outlet></router-outlet>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    RolesComponent.ctorParameters = function () { return []; };
    return RolesComponent;
}());

var ListComponent = /** @class */ (function () {
    function ListComponent(dataState, notifier, guardian, router$$1) {
        this.dataState = dataState;
        this.notifier = notifier;
        this.guardian = guardian;
        this.router = router$$1;
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
        { type: core.Component, args: [{
                    template: "\n    <h1 class = \"mt-4\">Roles</h1>\n    <div class = \"controls mt-4\">\n      <button class = \"btn btn-primary\" routerLink = \"/roles/add\">\n        <strong>Add New Role</strong>\n      </button>\n    </div>\n    <table class = \"table mt-4\" [ngClass] = \"{'table-hover': roles.length}\" >\n      <thead *ngIf = \"roles.length\">\n        <tr>\n          <th>Role Name</th>\n          <th>Role Description</th>\n          <th class = \"text-center\">Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor = \"let role of roles\">\n          <td>{{role.roleName}}</td>\n          <td>{{role.roleDescription}}</td>\n          <td class = \"text-center\">\n            <button class = \"btn btn-secondary btn-sm\" [disabled] = \"!role._id\" \n            [routerLink] = \"['/roles/view/', role._id]\">\n              <span class = \"fa fa-eye\"></span>\n            </button>\n            <button class = \"btn btn-warning btn-sm\" [disabled] = \"!role._id\"\n            [routerLink] = \"['/roles/edit/', role._id]\">\n              <span class = \"fa fa-edit\"></span>\n            </button>\n            <button class = \"btn btn-danger btn-sm\" [disabled] = \"!role._id || role.users\"\n            [routerLink] = \"['/roles', {outlets: {empty: ['delete', role._id]}}]\"\n            skipLocationChange>\n              <span class = \"fa fa-times-circle-o\"></span>\n            </button>\n          </td>\n        </tr>\n        <tr *ngIf = \"!roles.length\">\n          <td colspan = \"3\" class = \"text-center text-muted\">\n            <strong>No roles in the database</strong>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  "
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: ngDataState.DataState, },
        { type: ngNotifier.Notifier, },
        { type: ngGuardian.Guardian, },
        { type: router.Router, },
    ]; };
    return ListComponent;
}());

var AddEditViewComponent = /** @class */ (function () {
    function AddEditViewComponent(guardian, http, dataState, route, notifier) {
        this.guardian = guardian;
        this.http = http;
        this.dataState = dataState;
        this.route = route;
        this.notifier = notifier;
    }
    AddEditViewComponent.decorators = [
        { type: core.Component, args: [{
                    template: "\n    <h1 class = \"mt-4\">{{view?.title}}</h1>\n    <form #f = \"ngForm\" novalidate>\n      <p class = \"ng-roles-section-title\">\n        <strong>Role Information</strong>\n      </p>\n      <input type = \"hidden\" name = \"_id\" ngModel />\n      <div class=\"form-group row\">\n        <label class=\"col col-md-auto col-form-label\">Role Name: </label>\n        <div class=\"col-4\">\n          <input class=\"form-control\" type=\"text\" name = \"roleName\" ngModel \n          required autocomplete = \"off\" [disabled] = \"view?.inputDisabled\">\n        </div>\n      </div>\n      <div class = \"form-group row\">\n        <label class=\"col col-md-auto col-form-label\">Role Description: </label>\n        <div class=\"col-4\">\n          <input class=\"form-control\" type=\"search\" name = \"roleDescription\" \n          ngModel required autocomplete = \"off\" [disabled] = \"view?.inputDisabled\">\n        </div>\n      </div>\n      <p class = \"ng-roles-section-title\">\n        <strong>Role Actions</strong>\n      </p>\n      <table class = \"table mt-4\" [ngClass] = \"{'table-hover': !view?.isView}\">\n        <thead>\n          <tr>\n            <th class = \"text-center\"><span class = \"fa\" \n            [ngClass] = \"circleClass(routes.selected)\" \n            (click) = \"toggleAll()\"></span></th>\n            <th>Module</th>\n            <th>Application</th>\n            <th>Route</th>\n            <th class = \"text-center\">Default</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor = \"let route of routes\">\n            <td class = \"text-center\">\n              <span class = \"fa\" [ngClass] = \"circleClass(route.selected)\" \n              (click) = \"toggler(route)\"></span>\n            </td>\n            <td>{{route.parent}}</td>\n            <td>{{route.label}}</td>\n            <td>{{route.path}}</td>\n            <td class = \"text-center\">\n              <span class = \"fa\" [ngClass] = \"circleClass(route.default)\" \n              (click) = \"defaulter(route)\"></span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      <div class = \"mt-4\">\n        <button *ngIf = \"!view?.isView\" class = \"btn btn-primary\" \n        (click) = \"sendData()\" [disabled] = \"f.invalid || !selectedRoutes?.length\">\n          <strong>{{view?.submitButtonTitle}}</strong>\n        </button>\n        <button type = \"button\" class = \"btn btn-secondary ml-2\" \n        routerLink = \"/roles/list\">\n          <strong>{{view?.cancelButtonTitle}}</strong>\n        </button>    \n      </div>\n    </form>\n  ",
                    styles: ["\n    .fa {\n      font-size: 20px;\n    }\n    input[disabled] {\n      background-color: #fff;\n      cursor: default;\n    }\n    .cursor-hand {\n      cursor: pointer;\n    }\n    .cursor-default {\n      cursor: default;\n    }\n    label {\n      width: 155px;\n    }\n    .ng-roles-section-title {\n      margin: 25px 0 20px;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    AddEditViewComponent.ctorParameters = function () { return [
        { type: ngGuardian.Guardian, },
        { type: ngHttpClientPlus.HttpClientPlus, },
        { type: ngDataState.DataState, },
        { type: router.ActivatedRoute, },
        { type: ngNotifier.Notifier, },
    ]; };
    AddEditViewComponent.propDecorators = {
        'form': [{ type: core.ViewChild, args: ['f',] },],
    };
    return AddEditViewComponent;
}());

var ngOnInit = function () {
    var _this = this;
    this.resource = this.dataState.getResource('roles');
    this.setState();
    this.changer = this.resource.onUpdate().subscribe(function (record) {
        if (record._id === _this._id) {
            _this.setState();
        }
    });
    this.remover = this.resource.onDelete().subscribe(function (_id) {
        if (_this._id === _id) {
            _this.guardian.router.navigate(['/roles']);
        }
    });
};

var ngOnDestroy = function () {
    var _this = this;
    ['remover', 'changer'].forEach(function (type) { return _this[type].complete(); });
};

var methodsWrapper = function (methods) {
    return _.mapValues(methods, function (method) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var view = this.view;
            if (view && view.isView) {
                return;
            }
            return method.apply(this, args);
        };
    });
};

var circleClass = function (selected) {
    var classes = [];
    var view = this.view;
    classes.push(selected ? 'fa-circle' : 'fa-circle-thin');
    classes.push(view && view.isView ? 'cursor-default' : 'cursor-hand');
    return classes.join(' ');
};

var defaultChecker = function (routes) {
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var route = routes_1[_i];
        if (route.default && route.selected) {
            return true;
        }
    }
};

var routeSorter = function (desc) {
    if (desc === void 0) { desc = true; }
    return function (route1, route2) {
        if (desc) {
            _a = [route1, route2], route2 = _a[0], route1 = _a[1];
        }
        return route1.paths.length - route2.paths.length;
        var _a;
    };
};

var toggleAll = function () {
    var routes = this.routes;
    var selected = routes.selected;
    selected = !selected;
    _.extend(routes, { selected: selected });
    routes = routes.slice().sort(routeSorter());
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var route = routes_1[_i];
        if (route.selected !== selected) {
            this.toggler(route, selected, true);
        }
    }
    if (!defaultChecker(routes)) {
        var selectedRoute = _.filter(this.routes, { selected: true })[0];
        if (selectedRoute) {
            this.defaulter(selectedRoute);
        }
    }
};

var defaultsClearer = function (routes) {
    _.each(routes, function (route) {
        route.default = false;
    });
};

var defaulter = function (route) {
    if (!route.selected) {
        return;
    }
    defaultsClearer(this.routes);
    route.default = true;
};

var subsetChecker = function (subSet, mainSet) {
    var subSetLength = subSet.length;
    if (subSetLength < mainSet.length) {
        for (var i = 0; i < subSetLength; i++) {
            if (subSet[i] !== mainSet[i]) {
                return;
            }
        }
        return true;
    }
};

var selectedDescendantChecker = function (routes, route) {
    var paths = route.paths;
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var _route = routes_1[_i];
        var _paths = _route.paths, selected = _route.selected;
        if (subsetChecker(paths, _paths) && selected) {
            return true;
        }
    }
};

var groupToggler = function (routes, route, selected) {
    var group = route.group;
    if (!group) {
        return;
    }
    var groupRoutes = _.filter(routes, { group: group });
    _.each(groupRoutes, function (route) {
        _.extend(route, { selected: selected });
    });
};

var relationsToggler = function (routes, route, selected) {
    var paths = route.paths;
    routes = routes.slice().sort(routeSorter());
    _.each(routes, function (route) {
        var _paths = route.paths;
        if (subsetChecker(_paths, paths)) {
            var _selected = route.selected, autoMarked = route.autoMarked;
            if ((selected && !_selected) ||
                (!selected && autoMarked &&
                    !selectedDescendantChecker(routes, route))) {
                _.extend(route, { selected: selected, autoMarked: selected });
            }
        }
    });
};

var toggler = function (route, selected, noDefaultSetting) {
    if (noDefaultSetting === void 0) { noDefaultSetting = false; }
    var routes = this.routes;
    if (route.universal) {
        return;
    }
    if (_.isUndefined(selected)) {
        (selected = route.selected);
        selected = !selected;
    }
    if (!selected && selectedDescendantChecker(routes, route)) {
        return;
    }
    _.extend(route, { selected: selected });
    groupToggler(routes, route, selected);
    relationsToggler(routes, route, selected);
    var selectedRoutes = _.filter(routes, { selected: true });
    routes.selected = selectedRoutes.length === routes.length;
    if (!noDefaultSetting) {
        if (selectedRoutes.length && !defaultChecker(selectedRoutes)) {
            this.defaulter(selectedRoutes[0]);
        }
    }
    _.extend(this, { selectedRoutes: selectedRoutes });
};

var typeToHttpMethodMap = { add: 'post', edit: 'patch', view: null };

var parentLabelGetter = function (routes, paths) {
    for (var i = 0, parent, label, ancestors = [], length = paths.length; i < length; i++) {
        var parentPath = paths[i];
        var route = _.filter(routes, { path: parentPath })[0];
        var path = route.path, label_1 = route.label, children = route.children;
        ancestors.push(label_1 || _.capitalize(path));
        routes = children;
    }
    if (length === 1) {
        parent = ancestors[0];
        label = parent;
    }
    else {
        parent = ancestors.slice(0, length - 1).join(' :: ');
        label = _.last(ancestors);
    }
    return [parent, label];
};

function routesFlattener(params) {
    var routes = params.routes, childrenRoutes = params.childrenRoutes, _a = params.flattened, flattened = _a === void 0 ? [] : _a, _b = params.paths, paths = _b === void 0 ? [] : _b;
    var _c = params.include, include = _c === void 0 ? false : _c, _d = params.universalParent, universalParent = _d === void 0 ? false : _d;
    _.each(childrenRoutes || routes, function (route) {
        if (route.admin) {
            return;
        }
        var path = route.path, children = route.children, _default = route.default, component = route.component, universal = route.universal;
        var endpoints = route.endpoints, group = route.group;
        var newPaths = paths.concat(path);
        var fullPath = [''].concat(_.compact(newPaths)).join('/');
        var _a = parentLabelGetter(routes, newPaths), parent = _a[0], label = _a[1];
        if (universalParent) {
            universal = universalParent;
        }
        var routeData = {
            label: label,
            group: group,
            parent: parent,
            universal: universal,
            endpoints: endpoints,
            path: fullPath,
            paths: newPaths,
            default: _default,
            selected: universal
        };
        if (children) {
            if (!_.filter(children, { path: '' }).length) {
                flattened.push(routeData);
            }
            return routesFlattener({
                routes: routes,
                include: include,
                flattened: flattened,
                universalParent: universalParent,
                paths: newPaths,
                childrenRoutes: children
            });
        }
        if (component || include) {
            flattened.push(routeData);
        }
    });
    return flattened;
}

var viewStateMaker = function (type) {
    var view = { type: type };
    var title = _.capitalize(type) + ' Role';
    var isView = type === 'view';
    var inputDisabled = isView ? true : false;
    var submitButtonTitle = (type === 'edit' ? 'Update' : 'Add') + ' Role';
    var cancelButtonTitle = isView ? 'Back to Roles' : 'Cancel';
    return _.extend(view, {
        title: title,
        isView: isView,
        inputDisabled: inputDisabled,
        submitButtonTitle: submitButtonTitle,
        cancelButtonTitle: cancelButtonTitle
    });
};

var pause = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms || 0); }); };

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _$$1 = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_$$1) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _$$1.label++; return { value: op[1], done: false };
                case 5: _$$1.label++; y = op[1]; op = [0]; continue;
                case 7: op = _$$1.ops.pop(); _$$1.trys.pop(); continue;
                default:
                    if (!(t = _$$1.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _$$1 = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _$$1.label = op[1]; break; }
                    if (op[0] === 6 && _$$1.label < t[1]) { _$$1.label = t[1]; t = op; break; }
                    if (t && _$$1.label < t[2]) { _$$1.label = t[2]; _$$1.ops.push(op); break; }
                    if (t[2]) _$$1.ops.pop();
                    _$$1.trys.pop(); continue;
            }
            op = body.call(thisArg, _$$1);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var dataStater = function (role) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var routes, selectedRoutes, formValues;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    routes = role.routes;
                    selectedRoutes = routesFlattener({ routes: routes, include: true });
                    selectedRoutes.sort(routeSorter());
                    defaultsClearer(this.routes);
                    _.each(selectedRoutes, function (route) {
                        var path = route.path, _default = route.default;
                        var actualRoute = _.filter(_this.routes, { path: path })[0];
                        if (actualRoute) {
                            if (_default) {
                                _.extend(actualRoute, { default: _default });
                            }
                            _this.toggler(actualRoute, true, true);
                        }
                    });
                    return [4 /*yield*/, pause()];
                case 1:
                    _a.sent();
                    formValues = _.omit(role, ['routes']);
                    this.form.patchValue(formValues);
                    return [2 /*return*/];
            }
        });
    });
};

var setState = function () {
    var _a = this.route.snapshot, url = _a.url, params = _a.params;
    var id = params.id;
    var type = url[0].path;
    var form = this.form.form;
    var role = _.find(this.resource.data, { _id: id });
    if (form) {
        _.extend(this, { form: form });
    }
    _.extend(this, { _id: id });
    this.httpMethod = typeToHttpMethodMap[type];
    this.originalRoutes = this.guardian.routes('auth');
    this.routes = routesFlattener({ routes: this.originalRoutes });
    this.view = null;
    if (role) {
        dataStater.call(this, role);
    }
    this.selectedRoutes = _.filter(this.routes, { selected: true });
    if (!role) {
        var selectedRoute = this.selectedRoutes[0];
        if (selectedRoute) {
            this.defaulter(selectedRoute);
        }
    }
    this.view = viewStateMaker(type);
};

var __assign$2 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var baseParams = {
    activeTime: 2500
};
var baseClasses = {
    container: 'mt-4'
};
var successConfigs = __assign$2({ classes: __assign$2({}, baseClasses, { notifier: 'alert alert-success', icon: 'fa fa-check-circle-o' }) }, baseParams);
var errorConfigs = __assign$2({ classes: __assign$2({}, baseClasses, { notifier: 'alert alert-danger', icon: 'fa fa-warning' }) }, baseParams);

var notificationMessages = {
    patch: 'The role was updated',
    post: 'The role was added'
};

function emptyChildGetter(paths, originalRoutes) {
    var path = paths.shift();
    var route = _.filter(originalRoutes, { path: path })[0];
    var children = route.children;
    if (paths.length) {
        return emptyChildGetter(paths, children);
    }
    return _.filter(children, { path: '' })[0];
}

var flatChildrenGetter = function (paths, selectedRoutes) {
    var path = [''].concat(paths).join('/');
    var childSize = paths.length + 1;
    return _.reduce(selectedRoutes, function (children, route) {
        var paths = route.paths, _path = route.path;
        if (paths.length === childSize && _path.startsWith(path)) {
            children.push(_.last(paths));
        }
        return children;
    }, []);
};

var emptyRouteResolver = function (paths) {
    var emptyChild = emptyChildGetter(paths.slice(), this.originalRoutes);
    if (!emptyChild) {
        return;
    }
    var redirectTo = emptyChild.redirectTo;
    var currentChildren = flatChildrenGetter(paths, this.selectedRoutes);
    if (currentChildren.indexOf(redirectTo) !== -1) {
        return { path: '' };
    }
    return { path: '', redirectTo: currentChildren[0] };
};

var endpointsCombiner = function (roleEndpoints, endpoints) {
    _.each(endpoints, function (endpoints, method) {
        var _a = method, _b = roleEndpoints[_a], methodEndpoints = _b === void 0 ? [] : _b;
        roleEndpoints[method] = _.uniq(methodEndpoints.concat(endpoints));
    });
};

function routeTreeBuilder(route, roleRoutes, roleEndpoints, index) {
    if (index === void 0) { index = 0; }
    var paths = route.paths;
    var path = paths[index];
    var childIndex = index + 1;
    var childPath = paths[childIndex];
    var routeInfo = _.filter(roleRoutes, { path: path })[0];
    if (!routeInfo) {
        routeInfo = { path: path };
    }
    if (roleRoutes.indexOf(routeInfo) === -1) {
        roleRoutes.push(routeInfo);
    }
    if (childPath) {
        var children = routeInfo.children;
        if (!children) {
            var pathsToEmpty = paths.slice(0, childIndex);
            var emptyRoute = emptyRouteResolver.call(this, pathsToEmpty);
            _.extend(routeInfo, { children: children = [] });
            if (emptyRoute) {
                children.push(emptyRoute);
            }
        }
        routeTreeBuilder.call(this, route, children, roleEndpoints, childIndex);
    }
    else {
        var _default = route.default, endpoints = route.endpoints;
        if (_default) {
            _.extend(routeInfo, { default: _default });
        }
        if (endpoints) {
            endpointsCombiner(roleEndpoints, endpoints);
        }
    }
}

var routesBuilder = function () {
    var _this = this;
    var routes = [];
    var endpoints = {};
    _.each(this.selectedRoutes, function (route) {
        routeTreeBuilder.call(_this, route, routes, endpoints);
    });
    return { routes: routes, endpoints: endpoints };
};

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var sendData = function () {
    var routesAndEndpoints = routesBuilder.call(this);
    var data = _.extend(__assign$1({}, routesAndEndpoints), this.form.value);
    var message = notificationMessages[this.httpMethod];
    this.guardian.router.navigate(['/roles/list']);
    this.notifier.send('roles-messager', __assign$1({ message: message }, successConfigs));
    this.resource[this.httpMethod]({ data: data });
};

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
_.extend(AddEditViewComponent.prototype, __assign({ ngOnInit: ngOnInit,
    ngOnDestroy: ngOnDestroy,
    setState: setState,
    circleClass: circleClass }, methodsWrapper({ toggleAll: toggleAll, defaulter: defaulter, toggler: toggler, sendData: sendData })));

var __assign$3 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _$$1 = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_$$1) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _$$1.label++; return { value: op[1], done: false };
                case 5: _$$1.label++; y = op[1]; op = [0]; continue;
                case 7: op = _$$1.ops.pop(); _$$1.trys.pop(); continue;
                default:
                    if (!(t = _$$1.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _$$1 = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _$$1.label = op[1]; break; }
                    if (op[0] === 6 && _$$1.label < t[1]) { _$$1.label = t[1]; t = op; break; }
                    if (t && _$$1.label < t[2]) { _$$1.label = t[2]; _$$1.ops.push(op); break; }
                    if (t[2]) _$$1.ops.pop();
                    _$$1.trys.pop(); continue;
            }
            op = body.call(thisArg, _$$1);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DeleteComponent = /** @class */ (function () {
    function DeleteComponent(route, dataState, router$$1, notifier) {
        this.route = route;
        this.dataState = dataState;
        this.router = router$$1;
        this.notifier = notifier;
    }
    DeleteComponent.prototype.ngOnInit = function () {
        return __awaiter$1(this, void 0, void 0, function () {
            var id, outletAddress;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = this.route.snapshot.params.id;
                        outletAddress = ['/roles', { outlets: { empty: null } }];
                        this.dataState.getResource('roles').delete({ data: { _id: id } });
                        this.notifier.send('roles-messager', __assign$3({ message: 'The role was deleted' }, successConfigs));
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
        { type: core.Component, args: [{ template: '' },] },
    ];
    /** @nocollapse */
    DeleteComponent.ctorParameters = function () { return [
        { type: router.ActivatedRoute, },
        { type: ngDataState.DataState, },
        { type: router.Router, },
        { type: ngNotifier.Notifier, },
    ]; };
    return DeleteComponent;
}());

var RolesDataResolverService = /** @class */ (function () {
    function RolesDataResolverService(dataState) {
        this.dataState = dataState;
    }
    RolesDataResolverService.prototype.resolve = function () {
        return this.dataState.createResource({ name: 'roles' });
    };
    RolesDataResolverService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    RolesDataResolverService.ctorParameters = function () { return [
        { type: ngDataState.DataState, },
    ]; };
    return RolesDataResolverService;
}());

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
        { type: core.Injectable },
    ];
    /** @nocollapse */
    DeleteConfirmerService.ctorParameters = function () { return [
        { type: ngNotifier.Notifier, },
    ]; };
    return DeleteConfirmerService;
}());

var rolesRoutes = [
    {
        path: 'roles',
        role: 'auth',
        label: 'Roles',
        link: true,
        component: RolesComponent,
        resolve: {
            '': RolesDataResolverService
        },
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: ListComponent,
                group: 'roles'
            },
            {
                path: 'add',
                component: AddEditViewComponent,
                group: 'roles'
            },
            {
                path: 'view/:id',
                label: 'View',
                component: AddEditViewComponent,
                group: 'roles'
            },
            {
                path: 'edit/:id',
                label: 'Edit',
                component: AddEditViewComponent,
                group: 'roles'
            },
            {
                path: 'delete/:id',
                label: 'Delete',
                group: 'roles',
                component: DeleteComponent,
                outlet: 'empty',
                canActivate: [DeleteConfirmerService]
            }
        ]
    }
];
var AuthorizerModule = /** @class */ (function () {
    function AuthorizerModule() {
    }
    AuthorizerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        ngNotifier.NotifierComponentsModule,
                        ngNotifier.NotifierServicesModule,
                        ngDataState.DataStateModule,
                        router.RouterModule.forChild(rolesRoutes)
                    ],
                    providers: [
                        RolesDataResolverService,
                        DeleteConfirmerService
                    ],
                    declarations: [
                        RolesComponent,
                        ListComponent,
                        AddEditViewComponent,
                        DeleteComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    AuthorizerModule.ctorParameters = function () { return []; };
    return AuthorizerModule;
}());

exports.AuthorizerModule = AuthorizerModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
