import * as _ from 'lodash';
export default (function (type) {
    var view = { type: type };
    var title = _.capitalize(type) + ' Role';
    var isView = type === 'view';
    var inputDisabled = isView ? true : false;
    var submitButtonTitle = (type === 'edit' ? 'Update' : 'Add') + ' Role';
    var cancelButtonTitle = isView ? 'Back to Roles' : 'Cancel';
    return _.extend(view, {
        title: title,
        isView: isView,
        inputDisabled: inputDisabled,
        submitButtonTitle: submitButtonTitle,
        cancelButtonTitle: cancelButtonTitle
    });
});
//# sourceMappingURL=view-state-maker.js.map