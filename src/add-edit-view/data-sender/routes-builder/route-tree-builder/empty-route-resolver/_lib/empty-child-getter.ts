import * as _ from 'lodash';

export default function emptyChildGetter(paths, originalRoutes) {
  let path = paths.shift();
  let [route] = _.filter(originalRoutes, {path});
  let {children} = route;
  
  if(paths.length) {
    return emptyChildGetter(paths, children);
  }
  
  return _.filter(children, {path: ''})[0];
}
