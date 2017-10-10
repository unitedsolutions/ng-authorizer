import * as _            from 'lodash';
import parentLabelGetter from './_lib/parent-label-getter';

export default function routesFlattener(params) {
  let {routes, childrenRoutes, flattened = [], paths = []} = params;
  let {include = false, universalParent = false} = params;
  
  _.each(childrenRoutes || routes, route => {
    if(route.admin) {
      return;
    }
    
    let {path, children, default: _default, component, universal} = route;
    let {endpoints, group} = route;
    let newPaths = paths.concat(path);
    let fullPath = [''].concat(_.compact(newPaths)).join('/');
    let [parent, label] = parentLabelGetter(routes, newPaths);
    
    if(universalParent) {
      universal = universalParent;
    }
    
    let routeData = {
      label,
      group,
      parent,
      universal,
      endpoints,
      path: fullPath,
      paths: newPaths,
      default: _default,
      selected: universal
    };
    
    if(children) {
      if(!_.filter(children, {path: ''}).length) {
        flattened.push(routeData);
      }
      
      return routesFlattener({
        routes, 
        include,
        flattened,
        universalParent,
        paths: newPaths,
        childrenRoutes: children
      });
    }
    
    if(component || include) {
      flattened.push(routeData);
    }
  });
  
  return flattened;
}
