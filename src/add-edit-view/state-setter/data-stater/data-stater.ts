import * as _          from 'lodash';
import pause           from '../../../_lib/pause';
import defaultsClearer from '../../_lib/defaults-clearer';
import routeSorter     from '../../_lib/route-sorter';
import routesFlattener from '../routes-flattener/routes-flattener';

export default async function(role) {
  let {routes} = role;
  let selectedRoutes = routesFlattener({routes, include: true});
  
  selectedRoutes.sort(routeSorter());
  defaultsClearer(this.routes);

  _.each(selectedRoutes, route => {
    let {path, default: _default} = route;
    let [actualRoute] = _.filter(this.routes, {path});
    if(actualRoute) {
      if(_default) {
        _.extend(actualRoute, {default: _default});
      }
      
      this.toggler(actualRoute, true, true);
    }
  });
  
  await pause();
  let formValues = _.omit(role, ['routes']);
  this.form.patchValue(formValues);
}
