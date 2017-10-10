import * as _ from 'lodash';
export default function (routes, route, selected) {
    var group = route.group;
    if (!group) {
        return;
    }
    var groupRoutes = _.filter(routes, { group: group });
    _.each(groupRoutes, function (route) {
        _.extend(route, { selected: selected });
    });
};
//# sourceMappingURL=group-toggler.js.map