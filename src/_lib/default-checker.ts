export default routes => {
  for(let route of routes) {
    if(route.default && route.selected) {
      return true;
    }
  }
};
