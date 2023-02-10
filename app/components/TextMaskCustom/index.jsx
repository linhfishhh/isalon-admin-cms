/**
 *
 * TextMaskCustom
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

function TextMaskCustom(props) {
  const { inputRef, mask, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  mask: PropTypes.array,
};

export default memo(TextMaskCustom);
