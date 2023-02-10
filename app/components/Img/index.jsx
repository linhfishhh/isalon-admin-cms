/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DEFAULT_IMAGE } from 'utils/constants';

const MyImg = styled.img`
  object-fit: ${props => props.resizeMode};
`;

function Img(props) {
  const { className, src, alt, ...rest } = props;
  const imageSource = src || DEFAULT_IMAGE;
  return <MyImg className={className} src={imageSource} alt={alt} {...rest} />;
}

Img.defaultProps = {
  alt: 'photo',
  resizeMode: 'cover',
  src: DEFAULT_IMAGE,
};

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]),
  alt: PropTypes.string,
  className: PropTypes.string,
  resizeMode: PropTypes.oneOf(['fill', 'contain', 'cover', 'scale-down']),
};

export default Img;
