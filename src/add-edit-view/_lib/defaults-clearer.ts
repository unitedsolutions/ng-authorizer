import * as _ from 'lodash';

export default routes => {
  _.each(routes, route => {
    route.default = false;
  });
};
