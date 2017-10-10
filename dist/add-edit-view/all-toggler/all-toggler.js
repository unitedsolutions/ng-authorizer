import * as _ from 'lodash';
import defaultChecker from '../../_lib/default-checker';
import routeSorter from '../_lib/route-sorter';
export default function () {
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
}
//# sourceMappingURL=all-toggler.js.map