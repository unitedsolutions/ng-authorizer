import * as _ from 'lodash';

export default type => {
  let view = {type};
  let title = _.capitalize(type) + ' Role';
  let isView = type === 'view';
  let inputDisabled = isView ? true : false;
  let submitButtonTitle = (type === 'edit' ? 'Update' : 'Add') + ' Role';
  let cancelButtonTitle = isView ? 'Back to Roles' : 'Cancel';
  
  return _.extend(view, {
    title, 
    isView,
    inputDisabled, 
    submitButtonTitle, 
    cancelButtonTitle
  });
};
