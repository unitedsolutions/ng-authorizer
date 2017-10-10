import * as _             from 'lodash';
import emptyRouteResolver from './empty-route-resolver/empty-route-resolver';
import endpointsCombiner  from './endpoints-combiner/endpoints-combiner';

export default function routeTreeBuilder(route, roleRoutes, roleEndpoints, index = 0) {
  let {paths} = route;
  let path = paths[index];
  let childIndex = index + 1;
  let childPath = paths[childIndex];
  let [routeInfo] = _.filter(roleRoutes, {path});
  
  if(!routeInfo) {
    routeInfo = {path};
  }
  
  if(roleRoutes.indexOf(routeInfo) === -1) {
    roleRoutes.push(routeInfo);
  }

  if(childPath) {
    let {children} = routeInfo;
      
    if(!children) {
      let pathsToEmpty = paths.slice(0, childIndex);
      let emptyRoute = emptyRouteResolver.call(this, pathsToEmpty);
        
      _.extend(routeInfo, {children: children = []});
        
      if(emptyRoute) {
        children.push(emptyRoute);
      }
    }
  
    routeTreeBuilder.call(this, route, children, roleEndpoints, childIndex);    
  } else {
    let {default: _default, endpoints} = route;
      
    if(_default) {
      _.extend(routeInfo, {default: _default});
    }
      
    if(endpoints) {
      endpointsCombiner(roleEndpoints, endpoints);
    }    
  }
}
