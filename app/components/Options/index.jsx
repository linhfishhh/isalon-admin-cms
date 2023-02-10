import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import styled from 'styled-components';
import Button from 'components/Button';
import ThemeSelect from 'components/ThemeSelect';

const Wrapper = styled.div`
  width: 240px;
  overflow-x: hidden;
  padding: ${props => props.theme.spacing(3)}px;
`;

function Options(props) {
  const { onChangeTheme } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="iconButton"
        icon="option"
        color="inherit"
        onClick={() => setOpen(true)}
      />
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <Wrapper>
          <ThemeSelect onSelect={onChangeTheme} />
        </Wrapper>
      </Drawer>
    </>
  );
}

Options.propTypes = {
  onChangeTheme: PropTypes.func,
};

export default Options;
