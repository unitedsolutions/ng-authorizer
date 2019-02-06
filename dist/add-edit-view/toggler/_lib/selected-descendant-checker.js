import subsetChecker from './subset-checker';
export default (function (routes, route) {
    var paths = route.paths;
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var _route = routes_1[_i];
        var _paths = _route.paths, selected = _route.selected;
        if (subsetChecker(paths, _paths) && selected) {
            return true;
        }
    }
});
//# sourceMappingURL=selected-descendant-checker.js.map