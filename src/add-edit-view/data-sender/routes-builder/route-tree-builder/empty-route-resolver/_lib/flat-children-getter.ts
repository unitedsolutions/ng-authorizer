import * as _ from 'lodash';

export default (paths, selectedRoutes) => {
  let path = [''].concat(paths).join('/');
  let childSize = paths.length + 1;
  
  return _.reduce(selectedRoutes, (children, route) => {
    let {paths, path: _path} = route;
    
    if(paths.length === childSize && _path.startsWith(path)) {
      children.push(_.last(paths));
    }
    
    return children;
  }, []);
};
