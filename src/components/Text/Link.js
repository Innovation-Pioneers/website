/**
 * Link
 * ----
 * extends: Common
 * props:
 *  - active [bool]
 *  - as [string] || [func] (default: GatsbyLink)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';

import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import Common from './Common';

const AltState = () => css`
  opacity: 0.5;
`;

// eslint-disable-next-line react/jsx-props-no-spreading
const Link = styled(({ active, ...rest }) => <Common {...rest} />)`
  color: ${themeGet('colors.white.shade.1')};
  line-height: 1.3;
  font-size: ${(props) => props.mobilefontsize};

  font-weight: ${themeGet('fontWeights.light')};

  cursor: pointer;
  transition: opacity 500ms;

  &:hover,
  input:checked + & {
    ${AltState()}
  }

  ${(props) => (props.active && AltState())};
`;

Link.propTypes = {
  as: PropTypes.oneOfType([
    PropTypes.string, // tag
    PropTypes.func, // scroll link
    PropTypes.object, // gatsby link
  ]),
};

Link.defaultProps = {
  as: GatsbyLink,
};

export default Link;
