export default (desc = true) => {
  return (route1, route2) => {
    if(desc) {
      [route2, route1] = [route1, route2];
    }
    
    return route1.paths.length - route2.paths.length;
  }; 
};
