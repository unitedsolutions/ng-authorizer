import * as _         from 'lodash';
import defaultChecker from '../../_lib/default-checker';
import routeSorter    from '../_lib/route-sorter';

export default function() {
  let {routes} = this;
  let {selected} = routes;
  selected = !selected;
  _.extend(routes, {selected});
  routes = routes.slice().sort(routeSorter());
  
  for(let route of routes) {
    if(route.selected !== selected) {
      this.toggler(route, selected, true);
    }
  }
  
  if(!defaultChecker(routes)) {
    let [selectedRoute] = _.filter(this.routes, {selected: true});
    
    if(selectedRoute) {
      this.defaulter(selectedRoute);
    }
  }
}
