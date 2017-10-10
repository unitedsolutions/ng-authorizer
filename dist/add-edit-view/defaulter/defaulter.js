import defaultsClearer from '../_lib/defaults-clearer';
export default function (route) {
    if (!route.selected) {
        return;
    }
    defaultsClearer(this.routes);
    route.default = true;
}
//# sourceMappingURL=defaulter.js.map