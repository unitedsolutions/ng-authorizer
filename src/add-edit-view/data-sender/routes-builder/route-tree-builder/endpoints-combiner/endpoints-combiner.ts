import * as _ from 'lodash';

export default (roleEndpoints, endpoints) => {
  _.each(endpoints, (endpoints, method) => {
    let {[method]: methodEndpoints = []} = roleEndpoints;
    roleEndpoints[method] = _.uniq(methodEndpoints.concat(endpoints));
  });
};
