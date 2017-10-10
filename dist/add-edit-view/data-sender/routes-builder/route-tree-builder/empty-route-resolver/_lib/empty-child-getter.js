import * as _ from 'lodash';
export default function emptyChildGetter(paths, originalRoutes) {
    var path = paths.shift();
    var route = _.filter(originalRoutes, { path: path })[0];
    var children = route.children;
    if (paths.length) {
        return emptyChildGetter(paths, children);
    }
    return _.filter(children, { path: '' })[0];
}
//# sourceMappingURL=empty-child-getter.js.map