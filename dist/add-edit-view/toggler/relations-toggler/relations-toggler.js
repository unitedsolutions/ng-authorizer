import * as _ from 'lodash';
import routeSorter from '../../_lib/route-sorter';
import subsetChecker from '../_lib/subset-checker';
import selectedDescendantChecker from '../_lib/selected-descendant-checker';
export default function (routes, route, selected) {
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
//# sourceMappingURL=relations-toggler.js.map