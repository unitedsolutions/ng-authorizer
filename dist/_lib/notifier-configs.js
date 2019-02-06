var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var baseParams = {
    activeTime: 2500
};
var baseClasses = {
    container: 'mt-4'
};
var successConfigs = __assign({ classes: __assign({}, baseClasses, { notifier: 'alert alert-success', icon: 'fa fa-check-circle-o' }) }, baseParams);
var errorConfigs = __assign({ classes: __assign({}, baseClasses, { notifier: 'alert alert-danger', icon: 'fa fa-warning' }) }, baseParams);
export { successConfigs, errorConfigs };
//# sourceMappingURL=notifier-configs.js.map