import * as _ from 'lodash';
export default (function (paths, selectedRoutes) {
    var path = [''].concat(paths).join('/');
    var childSize = paths.length + 1;
    return _.reduce(selectedRoutes, function (children, route) {
        var paths = route.paths, _path = route.path;
        if (paths.length === childSize && _path.startsWith(path)) {
            children.push(_.last(paths));
        }
        return children;
    }, []);
});
//# sourceMappingURL=flat-children-getter.js.map