import subsetChecker from './subset-checker';

export default (routes, route) => {
  let {paths} = route;
  for(let _route of routes) {
    let {paths: _paths, selected} = _route;
    if(subsetChecker(paths, _paths) && selected) {
      return true;
    }
  }
};
