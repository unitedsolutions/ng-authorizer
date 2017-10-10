export default (subSet, mainSet) => {
  let {length: subSetLength} = subSet;
  
  if(subSetLength < mainSet.length) {
    for(var i = 0; i < subSetLength; i++) {
      if(subSet[i] !== mainSet[i]) {
        return;
      }
    }
    
    return true;
  }
};
