export default (function (desc) {
    if (desc === void 0) { desc = true; }
    return function (route1, route2) {
        var _a;
        if (desc) {
            _a = [route1, route2], route2 = _a[0], route1 = _a[1];
        }
        return route1.paths.length - route2.paths.length;
    };
});
//# sourceMappingURL=route-sorter.js.map