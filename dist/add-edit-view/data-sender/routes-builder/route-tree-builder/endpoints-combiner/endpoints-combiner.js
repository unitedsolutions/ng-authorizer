import * as _ from 'lodash';
export default (function (roleEndpoints, endpoints) {
    _.each(endpoints, function (endpoints, method) {
        var _a = method, _b = roleEndpoints[_a], methodEndpoints = _b === void 0 ? [] : _b;
        roleEndpoints[method] = _.uniq(methodEndpoints.concat(endpoints));
    });
});
//# sourceMappingURL=endpoints-combiner.js.map