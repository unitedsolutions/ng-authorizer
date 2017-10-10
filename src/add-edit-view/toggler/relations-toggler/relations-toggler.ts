import * as _                    from 'lodash';
import routeSorter               from '../../_lib/route-sorter';
import subsetChecker             from '../_lib/subset-checker';
import selectedDescendantChecker from '../_lib/selected-descendant-checker';

export default (routes, route, selected) => {
  let {paths} = route;
  routes = routes.slice().sort(routeSorter());
  
  _.each(routes, route => {
    let {paths: _paths} = route;
    
    if(subsetChecker(_paths, paths)) {
      let {selected: _selected, autoMarked} = route;
      
      if((selected && !_selected) || 
         (!selected && autoMarked && 
          !selectedDescendantChecker(routes, route))) {
        _.extend(route, {selected, autoMarked: selected});
      }
    }
  });
};
