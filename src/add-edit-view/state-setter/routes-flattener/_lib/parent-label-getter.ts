import * as _ from 'lodash';

export default (routes, paths) => {
  for(var i = 0, parent, label, ancestors = [], {length} = paths; i < length; i++) {
    let parentPath = paths[i];
    let route = _.filter(routes, {path: parentPath})[0];
    let {path, label, children} = route;
    ancestors.push(label || _.capitalize(path));
    routes = children;
  }
  
  if(length === 1) {
    [parent] = ancestors;
    label = parent;
  } else {
    parent = ancestors.slice(0, length - 1).join(' :: ');
    label = _.last(ancestors);
  }
  
  return [parent, label];
};
