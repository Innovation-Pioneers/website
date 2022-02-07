/**
 * App
 * ---
 * props:
 *  - children: [node] **required**
 */

import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import reset from 'styled-reset-advanced';
import PropTypes from 'prop-types';

import Fonts from './Fonts';
import theme from '../../theme';

require('typeface-montserrat');

const Global = createGlobalStyle`
  ${reset};
  img { pointer-events: none; }

  .rtl {
    direction: rtl;

    .store-controls-ar {
      flex-direction: row-reverse;
    }

    .introduction-buyButton-ar {
      margin-right: 0 !important;
      margin-left: 20px !important;

      @media(min-width: ${themeGet('breakpoints.2')}) {
        margin-right: -20px !important;
      }

      @media(min-width: ${themeGet('breakpoints.3')}) {
        margin-right: 0 !important;
      }
    }

    .introduction-slash-ar {
      @media(min-width: ${themeGet('breakpoints.2')}) {
        height: 800px;
        left: 40%;
      }
      top: 40% !important;
      transform:
        translate(-50%,-50%) translateY(15%) rotate(-26deg);
    }
  }
`;

const Wrapper = styled.div`
  font-family: ${(props) => (props.lang === 'en'
    ? 'Montserrat, Helvetica Neue, Helvetica, sans-serif'
    : 'GESSTwo, Montserrat, Helvetica Neue, Helvetica, sans-serif')
  };
  *, *:before, *:after { user-select: none; };
  overflow: hidden;
`;

function App({ children, lang }) {
  return (
    <ThemeProvider theme={{ ...theme, mode: 'light' }}>
      <>
        <Fonts />
        <Global />
        <Wrapper lang={lang} data-lang={lang}>
          {children}
        </Wrapper>
      </>
    </ThemeProvider>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
