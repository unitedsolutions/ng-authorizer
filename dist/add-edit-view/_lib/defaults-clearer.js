import * as _ from 'lodash';
export default function (routes) {
    _.each(routes, function (route) {
        route.default = false;
    });
};
//# sourceMappingURL=defaults-clearer.js.map