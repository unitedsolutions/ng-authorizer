import * as _                 from 'lodash';
import {AddEditViewComponent} from './_constructor/constructor';
import ngOnInit               from './initializer/initializer';
import ngOnDestroy            from './destroyer/destroyer';
import methodsWrapper         from './methods-wrapper/methods-wrapper';
import circleClass            from './circle-class/circle-class';
import toggleAll              from './all-toggler/all-toggler';
import defaulter              from './defaulter/defaulter';
import toggler                from './toggler/toggler';
import setState               from './state-setter/state-setter';
import sendData               from './data-sender/data-sender';

_.extend(AddEditViewComponent.prototype, {
  ngOnInit,
  ngOnDestroy,
  setState,
  circleClass,
  ...methodsWrapper({toggleAll, defaulter, toggler, sendData})
});

export {
  AddEditViewComponent
};
