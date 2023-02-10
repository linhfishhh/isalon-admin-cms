const generateToast = payload => {
  const toast = {
    key: new Date().getTime() + Math.random(),
    options: {},
  };
  const { message, type, variant, messageId } = payload;
  toast.message = message;
  if (type) {
    const actionRequest = type
      .split('/')
      .pop()
      .toLowerCase();
    const action = actionRequest.split('_')[0];
    toast.action = action;
  }
  toast.options.variant = variant === 'fail' ? 'error' : variant;
  toast.variant = variant;
  toast.messageId = messageId;
  return toast;
};

export const addToast = payload => {
  const toast = generateToast(payload);
  if (window.toast) {
    window.toast.getWrappedInstance().show(toast);
  }
};
