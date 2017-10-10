import emptyChildGetter   from './_lib/empty-child-getter';
import flatChildrenGetter from './_lib/flat-children-getter';

export default function(paths) {
  let emptyChild = emptyChildGetter(paths.slice(), this.originalRoutes);

  if(!emptyChild) {
    return;
  }
  
  let {redirectTo} = emptyChild;
  let currentChildren = flatChildrenGetter(paths, this.selectedRoutes);

  if(currentChildren.indexOf(redirectTo) !== -1) {
    return {path: ''};
  }
  
  return {path: '', redirectTo: currentChildren[0]};
}
