/**
 * Label
 * -----
 * extends: Common
 * themed:
 *  - mode `light || dark`
 */

import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import themed from 'styled-theming';

import Common from './Common';

const Label = styled(Common)`

  font-weight: ${themeGet('fontWeights.bold')} !important;
  font-size: ${themeGet('fontSizes.10')};

  @media(min-width: ${themeGet('breakpoints.1')}) {
    font-size: ${themeGet('fontSizes.11')};
  }

  @media(min-width: ${themeGet('breakpoints.2')}) {
    font-size: ${themeGet('fontSizes.13')};
  }

  color: ${themed('mode', {
    light: themeGet('colors.white.shade.0'),
    dark: themeGet('colors.secondary.base'),
  })};
`;

export default Label;
