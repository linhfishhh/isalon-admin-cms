import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import styled from 'styled-components';
import { Tooltip, Typography as MuiTypography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { getOptions } from 'utils/localStorage';

import variants from 'themes/variants';

const Typography = styled(MuiTypography)(spacing);

const ColorItem = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  display: inline-flex;
  border-radius: 15px;
  margin-right: 5px;
  border: solid #eee 3px;
  cursor: pointer;
  &:hover {
    border: solid #ddd 3px;
  }
  &.active {
    width: 36px;
    height: 36px;
    border-radius: 18px;
  }
`;

function ThemeSelect(props) {
  const { onSelect } = props;
  const selectTheme = index => {
    onSelect({ indexTheme: index });
  };
  const currentTheme = get(getOptions(), 'currentTheme') || 0;
  return (
    <>
      <Typography variant="h6" m={2}>
        Chủ đề
      </Typography>
      {variants.map((variant, index) => (
        <Tooltip key={variant.name} title={variant.name}>
          <ColorItem
            className={currentTheme === index ? 'active' : ''}
            color={variant.sidebar.background}
            onClick={() => selectTheme(index)}
          />
        </Tooltip>
      ))}
    </>
  );
}

ThemeSelect.propTypes = {
  onSelect: PropTypes.func,
};

export default ThemeSelect;
