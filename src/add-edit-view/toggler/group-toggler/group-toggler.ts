import * as _ from 'lodash';

export default (routes, route, selected) => {
  let {group} = route;
  
  if(!group) {
    return;
  }
  
  let groupRoutes = _.filter(routes, {group});
  
  _.each(groupRoutes, route => {
    _.extend(route, {selected});
  });
};
