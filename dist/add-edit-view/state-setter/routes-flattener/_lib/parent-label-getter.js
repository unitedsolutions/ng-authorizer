import * as _ from 'lodash';
export default function (routes, paths) {
    for (var i = 0, parent, label, ancestors = [], length = paths.length; i < length; i++) {
        var parentPath = paths[i];
        var route = _.filter(routes, { path: parentPath })[0];
        var path = route.path, label_1 = route.label, children = route.children;
        ancestors.push(label_1 || _.capitalize(path));
        routes = children;
    }
    if (length === 1) {
        parent = ancestors[0];
        label = parent;
    }
    else {
        parent = ancestors.slice(0, length - 1).join(' :: ');
        label = _.last(ancestors);
    }
    return [parent, label];
};
//# sourceMappingURL=parent-label-getter.js.map