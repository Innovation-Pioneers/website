/**
 * Button
 * ------
 * props:
 *  - data-text: [string] `[Contact us]` **required**
 */

  import styled from 'styled-components';
  import { themeGet } from '@styled-system/theme-get';
  import themed from 'styled-theming';

  const Button = styled.button`
    position: relative;
    display: inline-block;
    border-radius: 1000px;
    cursor: pointer;
    display: flex;
    align-items: center;    
    justify-content: center;
    flex: 0 0 auto;
    /* @TEMP */
    width: 232px;

    background: ${themed('mode', {
      dark: themeGet('colors.primary.base'),
      light: themeGet('colors.secondary.base'),
    })};
    
    background: ${themeGet('colors.secondary.base')};

    color: ${themeGet('colors.white.base')};
    font-size: ${themeGet('fontSizes.1')};
    font-weight: ${themeGet('fontWeights.regular')};
    padding: 20px 40px;

    transition: opacity 300ms;
    &:hover { opacity: 0.85; }

    &:after {
      content: attr(data-text);
      display: inline-block;
      transition: opacity 300ms;
      margin: 0 5px;
    }
`;

export default Button;
