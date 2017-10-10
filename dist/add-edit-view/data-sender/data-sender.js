var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as _ from 'lodash';
import { successConfigs } from '../../_lib/notifier-configs';
import notificationMessages from './_lib/notification-messages';
import routesBuilder from './routes-builder/routes-builder';
export default function () {
    var routesAndEndpoints = routesBuilder.call(this);
    var data = _.extend(__assign({}, routesAndEndpoints), this.form.value);
    var message = notificationMessages[this.httpMethod];
    this.guardian.router.navigate(['/roles/list']);
    this.notifier.send('roles-messager', __assign({ message: message }, successConfigs));
    this.resource[this.httpMethod]({ data: data });
}
//# sourceMappingURL=data-sender.js.map