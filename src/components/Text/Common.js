/**
 * Common
 * ------
 * props:
 *  - as (p / h1 / h2...)
 *  - space
 *  - maxWidth
 *  - fontSize
 *  - fontWeight
 *  - textAlign
 *  - color
 *  - opacity
 */

import styled from 'styled-components';
import {
  space,
  fontWeight,
  fontSize,
  textAlign,
  maxWidth,
  color,
  opacity,
} from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

import { antialias, noJitter } from '../../utils';

const Common = styled.p`
  ${antialias};
  ${noJitter};

  position: relative;
  user-select: text;

  font-family: ${themeGet('fontFamilies.default')};
  font-size: ${(props) => props.mobilefontsize || themeGet('fontSizes.1')};

  ${space}
  ${fontSize}
  ${fontWeight}
  ${textAlign}
  ${maxWidth}
  ${color}
  ${opacity}
`;

export default Common;
