export default function(selected) {
  let classes = [];
  let {view} = this;
  classes.push(selected ? 'fa-circle' : 'fa-circle-thin');
  classes.push(view && view.isView ? 'cursor-default' : 'cursor-hand');
  
  return classes.join(' ');
}
