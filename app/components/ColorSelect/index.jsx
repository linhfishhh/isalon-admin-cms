/**
 *
 * ColorSelect
 *
 */

import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Typography, Popover, Grid } from '@material-ui/core';
import { SketchPicker } from 'react-color';
import Button from 'components/Button';

const ColorSelected = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  border: solid 3px #fff;
  background-color: ${props => props.color};
  cursor: pointer;
`;

function ColorSelect(props) {
  const [colorPickerAnchorEl, setColorPickerAnchorEl] = React.useState(null);

  const { nameLabel, color, onColorChange } = props;

  const openColorPicker = Boolean(colorPickerAnchorEl);
  const colorPickerId = openColorPicker ? 'color-picker-popover' : undefined;

  const handleColorChanged = useCallback(event => {
    onColorChange(event.hex);
  }, []);

  const handleCloseColorPicker = useCallback(() => {
    setColorPickerAnchorEl(null);
  }, []);

  const showColorPicker = useCallback(event => {
    setColorPickerAnchorEl(event.currentTarget);
  }, []);

  const clearColorSelect = useCallback(() => {
    onColorChange('');
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Box m={3}>
            <Typography variant="body1">{nameLabel}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box m={2}>
            <ColorSelected color={color} onClick={showColorPicker} />
          </Box>
        </Grid>
        <Grid item xs={12} sm>
          <Button icon="clean" type="iconButton" onClick={clearColorSelect} />
        </Grid>
      </Grid>
      <Popover
        id={colorPickerId}
        open={openColorPicker}
        anchorEl={colorPickerAnchorEl}
        onClose={handleCloseColorPicker}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <SketchPicker color={color} onChangeComplete={handleColorChanged} />
      </Popover>
    </>
  );
}

ColorSelect.propTypes = {
  nameLabel: PropTypes.string,
  color: PropTypes.string,
  onColorChange: PropTypes.func,
};

export default memo(ColorSelect);
