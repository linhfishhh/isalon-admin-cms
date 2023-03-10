import React, { memo } from 'react';
import Slide from '@material-ui/core/Slide';

const Left = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default memo(Left);
