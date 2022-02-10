/**
 * Title
 * -----
 * extends: Common
 * themed:
 *  - mode `light || dark`
 */

import styled from 'styled-components';
import themed from 'styled-theming';
import styledProps from 'styled-props';
import { fontSize, fontWeight } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

import Common from './Common';

const Title = styled(Common)`
  line-height: 1;

  font-size: ${styledProps({
    h1: themeGet('fontSizes.10'),
    h2: themeGet('fontSizes.9'),
    h3: themeGet('fontSizes.7'),
    h4: themeGet('fontSizes.6'),
    h5: themeGet('fontSizes.2'),
  }, 'as')};

  @media(min-width: ${themeGet('breakpoints.1')}) {
    font-size: ${styledProps({
      h1: themeGet('fontSizes.11'),
      h2: themeGet('fontSizes.10'),
      h3: themeGet('fontSizes.8'),
      h4: themeGet('fontSizes.7'),
      h5: themeGet('fontSizes.2'),
    }, 'as')};
  }

  @media(min-width: ${themeGet('breakpoints.2')}) {
    font-size: ${styledProps({
      h1: themeGet('fontSizes.13'),
      h2: themeGet('fontSizes.11'),
      h3: themeGet('fontSizes.9'),
      h4: themeGet('fontSizes.8'),
      h5: themeGet('fontSizes.2'),
    }, 'as')};
  }

  font-weight: ${themeGet('fontWeights.bold')};

  color: ${themed('mode', {
    light: themeGet('colors.secondary.base'),
    dark: themeGet('colors.white.base'),
  })};

  ${fontSize};
  ${fontWeight};
`;

Title.defaultProps = {
  as: 'h2',
};

export default Title;
