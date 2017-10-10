import * as _ from 'lodash';

export default methods => {
  return _.mapValues(methods, method => {
    return function(...args) {
      let {view} = this;
      if(view && view.isView) {
        return;
      }
      
      return method.apply(this, args);
    }
  });  
};
