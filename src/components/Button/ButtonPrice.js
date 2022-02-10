/**
 * ButtonPrice
 * -----------
 * props:
 *  - data-text: [string] `[Contact us]` **required**
 */

import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import themed from 'styled-theming';

const Button = styled.button`
  position: relative;
  display: inline-block;
  border-radius: 1000px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: 100%;
  max-width: 280px;

  background: ${themed('mode', {
    dark: themeGet('colors.white.base'),
    light: themeGet('colors.secondary.shade.2'),
  })};
  
  background: ${themeGet('colors.white.base')};
  
  color: ${themeGet('colors.white.base')};
  font-size: ${themeGet('fontSizes.1')};
  font-weight: ${themeGet('fontWeights.regular')};

  transition: opacity 300ms;
  &:hover { opacity: 0.85; }

  &:before {
    content: attr(data-text);
    width: 100%;
    display: inline-block;
    padding: 17px 24px;
    color: ${themeGet('colors.button.shade.0')};

    border-left: 1px solid ${themeGet('colors.secondary.shade.4')};
    [data-lang="en"] & {
      border-right: 1px solid ${themeGet('colors.secondary.shade.4')};
      border-left: none;
    }
  }

  ${(props) => (props.isAvailable
    ? css`
      pointer-events: all;
      &:after {
        content: attr(data-price);
        display: flex;
        flex-direction: row;
        white-space: nowrap;
        padding: 20px 24px 20px 20px;
        color: ${themeGet('colors.secondary.base')};
        transition: opacity 300ms;
      }
    `
    : css`
      pointer-events: none;
      &:after {
        content: "";
        border: 3px solid transparent;
        border-left-color: ${themeGet('colors.secondary.shade.0')};
        border-top-color: ${themeGet('colors.secondary.shade.0')};
        border-radius: 50%;
        width: 24px;
        height: 24px;
        flex: 0 0 24px;
        margin: 16px 43px;
        animation: donut-spin 500ms linear infinite;

        @keyframes donut-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    `)
  }
`;

export default Button;
