/**
 *
 * SideView
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { OverlaySideView, WrapperSideView, ButtonClose } from './styles';

function SideView(props) {
  const { children, open, size, onClose } = props;

  return (
    <>
      <OverlaySideView show={open} />
      <WrapperSideView size={open ? size : 0}>
        <ButtonClose>
          <Button icon="close" type="iconButton" onClick={onClose} />
        </ButtonClose>
        {children}
      </WrapperSideView>
    </>
  );
}

SideView.defaultProps = {
  open: false,
  size: 200,
};

SideView.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  size: PropTypes.number,
  onClose: PropTypes.func,
};

export default memo(SideView);
