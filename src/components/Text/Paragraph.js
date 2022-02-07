/**
 * Paragraph
 * ---------
 * extends: Common
 * themed:
 *  - mode `light || dark`
 */

import styled, { css } from 'styled-components';
import themed from 'styled-theming';
import { themeGet } from '@styled-system/theme-get';

import Common from './Common';

const Paragraph = styled(Common)`
  font-weight: ${themeGet('fontWeights.light')};
  [data-lang="en"] & {
    font-weight: ${themeGet('fontWeights.regular')};
  }
  line-height: 1.35;
   
  color: ${themed('mode', {
    light: themeGet('colors.secondary.shade.0'),
    dark: themeGet('colors.white.shade.0'),
  })};

  ${(props) => (props.as === 'div' && css`
    & > *:not(:last-child) { margin-bottom: ${themeGet('space.4')}; }
  `)};

  @media(min-width: 1024px) {
    max-width: 600px;
  }

  strong {
    font-weight: ${themeGet('fontWeights.bold')} !important;
    color: ${themed('mode', {
    light: themeGet('colors.secondary.shade.0'),
    dark: themeGet('colors.white.base'),
  })};
  }

  em {
    font-style: italic;
  }

  small {
    font-size: ${themeGet('fontSizes.0')};
    opacity: 0.5;
    
    @media(max-width: ${themeGet('breakpoints.0')}) {
      font-size: 10px;
    }
  }

  a {
    font-weight: ${themeGet('fontWeights.bold')};
    border-bottom: 1px solid ${themeGet('colors.secondary.shade.2')};
  }
`;

export default Paragraph;
