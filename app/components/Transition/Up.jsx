import React, { memo } from 'react';
import Slide from '@material-ui/core/Slide';

const Up = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default memo(Up);
