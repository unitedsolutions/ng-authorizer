import * as _ from 'lodash';
import emptyRouteResolver from './empty-route-resolver/empty-route-resolver';
import endpointsCombiner from './endpoints-combiner/endpoints-combiner';
export default function routeTreeBuilder(route, roleRoutes, roleEndpoints, index) {
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
//# sourceMappingURL=route-tree-builder.js.map