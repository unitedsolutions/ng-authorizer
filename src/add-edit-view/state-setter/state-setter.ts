import * as _              from 'lodash';
import typeToHttpMethodMap from './_lib/type-to-http-method-map';
import routesFlattener     from './routes-flattener/routes-flattener';
import viewStateMaker      from './view-state-maker/view-state-maker';
import dataStater          from './data-stater/data-stater';

export default function() {
  let {url, params} = this.route.snapshot;
  let {id} = params;
  let type = url[0].path;
  let {form} = this.form;
  let role = _.find(this.resource.data, {_id: id});
  
  if(form) {
    _.extend(this, {form});
  }
  
  _.extend(this, {_id: id});
  this.httpMethod = typeToHttpMethodMap[type];
  this.originalRoutes = this.guardian.routes('auth');
  this.routes = routesFlattener({routes: this.originalRoutes});
  this.view = null;
  
  if(role) {
    dataStater.call(this, role);
  } 
  
  this.selectedRoutes = _.filter(this.routes, {selected: true});
  
  if(!role) {
    let [selectedRoute] = this.selectedRoutes;
    
    if(selectedRoute) {
      this.defaulter(selectedRoute);
    }
  }
  
  this.view = viewStateMaker(type);
}
