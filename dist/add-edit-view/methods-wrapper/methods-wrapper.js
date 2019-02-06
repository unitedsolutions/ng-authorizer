import * as _ from 'lodash';
export default (function (methods) {
    return _.mapValues(methods, function (method) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var view = this.view;
            if (view && view.isView) {
                return;
            }
            return method.apply(this, args);
        };
    });
});
//# sourceMappingURL=methods-wrapper.js.map