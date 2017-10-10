import * as _           from 'lodash';
import routeTreeBuilder from './route-tree-builder/route-tree-builder';

export default function() {
  let routes = [];
  let endpoints = {};
  
  _.each(this.selectedRoutes, route => {
    routeTreeBuilder.call(this, route, routes, endpoints);
  });
  
  return {routes, endpoints};
}
