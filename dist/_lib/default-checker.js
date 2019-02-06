export default (function (routes) {
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var route = routes_1[_i];
        if (route.default && route.selected) {
            return true;
        }
    }
});
//# sourceMappingURL=default-checker.js.map