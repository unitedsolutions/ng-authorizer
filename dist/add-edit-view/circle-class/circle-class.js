export default function (selected) {
    var classes = [];
    var view = this.view;
    classes.push(selected ? 'fa-circle' : 'fa-circle-thin');
    classes.push(view && view.isView ? 'cursor-default' : 'cursor-hand');
    return classes.join(' ');
}
//# sourceMappingURL=circle-class.js.map