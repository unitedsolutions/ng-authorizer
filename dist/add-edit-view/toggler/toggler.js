import * as _ from 'lodash';
import defaultChecker from '../../_lib/default-checker';
import selectedDescendantChecker from './_lib/selected-descendant-checker';
import groupToggler from './group-toggler/group-toggler';
import relationsToggler from './relations-toggler/relations-toggler';
export default function (route, selected, noDefaultSetting) {
    if (noDefaultSetting === void 0) { noDefaultSetting = false; }
    var routes = this.routes;
    if (route.universal) {
        return;
    }
    if (_.isUndefined(selected)) {
        (selected = route.selected);
        selected = !selected;
    }
    if (!selected && selectedDescendantChecker(routes, route)) {
        return;
    }
    _.extend(route, { selected: selected });
    groupToggler(routes, route, selected);
    relationsToggler(routes, route, selected);
    var selectedRoutes = _.filter(routes, { selected: true });
    routes.selected = selectedRoutes.length === routes.length;
    if (!noDefaultSetting) {
        if (selectedRoutes.length && !defaultChecker(selectedRoutes)) {
            this.defaulter(selectedRoutes[0]);
        }
    }
    _.extend(this, { selectedRoutes: selectedRoutes });
}
//# sourceMappingURL=toggler.js.map