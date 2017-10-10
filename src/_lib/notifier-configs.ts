let baseParams = {
  activeTime: 2500
};

let baseClasses = {
  container: 'mt-4'
};

let successConfigs = {
  classes: {
    ...baseClasses,
    notifier: 'alert alert-success',
    icon: 'fa fa-check-circle-o'
  },
  ...baseParams
};

let errorConfigs = {
  classes: {
    ...baseClasses,
    notifier: 'alert alert-danger',
    icon: 'fa fa-warning'
  },
  ...baseParams
};

export {
  successConfigs,
  errorConfigs
};
