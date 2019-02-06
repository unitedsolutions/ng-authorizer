import * as _ from 'lodash';
import routeTreeBuilder from './route-tree-builder/route-tree-builder';
export default function () {
    var _this = this;
    var routes = [];
    var endpoints = {};
    _.each(this.selectedRoutes, function (route) {
        routeTreeBuilder.call(_this, route, routes, endpoints);
    });
    return { routes: routes, endpoints: endpoints };
}
//# sourceMappingURL=routes-builder.js.map