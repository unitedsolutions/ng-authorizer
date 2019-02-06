import * as _ from 'lodash';
import parentLabelGetter from './_lib/parent-label-getter';
export default function routesFlattener(params) {
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
//# sourceMappingURL=routes-flattener.js.map