import emptyChildGetter from './_lib/empty-child-getter';
import flatChildrenGetter from './_lib/flat-children-getter';
export default function (paths) {
    var emptyChild = emptyChildGetter(paths.slice(), this.originalRoutes);
    if (!emptyChild) {
        return;
    }
    var redirectTo = emptyChild.redirectTo;
    var currentChildren = flatChildrenGetter(paths, this.selectedRoutes);
    if (currentChildren.indexOf(redirectTo) !== -1) {
        return { path: '' };
    }
    return { path: '', redirectTo: currentChildren[0] };
}
//# sourceMappingURL=empty-route-resolver.js.map