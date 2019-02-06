var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as _ from 'lodash';
import { AddEditViewComponent } from './_constructor/constructor';
import ngOnInit from './initializer/initializer';
import ngOnDestroy from './destroyer/destroyer';
import methodsWrapper from './methods-wrapper/methods-wrapper';
import circleClass from './circle-class/circle-class';
import toggleAll from './all-toggler/all-toggler';
import defaulter from './defaulter/defaulter';
import toggler from './toggler/toggler';
import setState from './state-setter/state-setter';
import sendData from './data-sender/data-sender';
_.extend(AddEditViewComponent.prototype, __assign({ ngOnInit: ngOnInit,
    ngOnDestroy: ngOnDestroy,
    setState: setState,
    circleClass: circleClass }, methodsWrapper({ toggleAll: toggleAll, defaulter: defaulter, toggler: toggler, sendData: sendData })));
export { AddEditViewComponent };
//# sourceMappingURL=add-edit-view.component.js.map