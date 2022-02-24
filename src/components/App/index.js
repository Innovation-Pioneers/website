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

  .whatsapp {
    font-family: 'Montserrat';

    input {
      font-family: 'Montserrat';
      direction: ${({ lang }) => (lang === 'en' ? 'ltr' : 'rtl')};
    }
    direction: ${({ lang }) => (lang === 'en' ? 'ltr' : 'rtl')};
  }

  .whatsapp div:first-child[aria-hidden] {
    left: ${({ lang }) => (lang === 'en' ? 'auto' : '2rem')};
    right: ${({ lang }) => (lang === 'en' ? '2rem' : 'auto')};
    background: #000;

    &:after {
      animation-name: newPulse;
    }

    @keyframes newPulse {
      0% {
        box-shadow: 0 0 0 0 #000;
        opacity: 1;
      }

      100% {
        box-shadow: 0 0 0 15px #000;
        opacity: 0;
      }
    }
  }
  
  .whatsapp div:last-child[aria-hidden] {
    left: ${({ lang }) => (lang === 'en' ? 'auto' : '4rem')};
    right: ${({ lang }) => (lang === 'en' ? '4rem' : 'auto')};
    transform-origin: ${({ lang }) => (
      lang === 'en' ? 'initial' : 'bottom left !important'
    )};
  }

  .whatsapp div:last-child[aria-hidden] > div > div,
  .whatsapp div:last-child[aria-hidden] > header > div:nth-child(2) {
    text-align: ${({ lang }) => (lang === 'en' ? 'left' : 'right')};
  }
  .whatsapp div:last-child[aria-hidden] > div > div {
    display: flex;
    flex-direction: column;
    width: fit-content;
    border-radius: ${({ lang }) => (
      lang === 'en' ? '0 8px 8px 8px' : '8px 0 8px 8px'
    )};
  }

  .whatsapp div:last-child[aria-hidden] > div > div > span:first-child {
    left: ${({ lang }) => (lang === 'en' ? '-10px' : 'auto')};
    right: ${({ lang }) => (lang === 'en' ? 'auto' : '-10px')};
    top: ${({ lang }) => (lang === 'en' ? '0' : '-10px')};
    transform: ${({ lang }) => `rotate(${lang === 'en' ? 0 : 135}deg)`};
  }

  .whatsapp div:last-child[aria-hidden] > footer > form > button {
    transform: ${({ lang }) => `rotate(${lang === 'en' ? 0 : 180}deg)`};
  }

  @media(max-width: 420px) {
    .whatsapp div:last-child[aria-hidden] {
      left: ${({ lang }) => (lang === 'en' ? 'auto' : '1rem')};
      right: ${({ lang }) => (lang === 'en' ? '1rem' : 'auto')};
    }
  }

  .rtl {
    direction: rtl;

    .store-controls-ar {
      flex-direction: row-reverse;
    }

    .introduction-buyButton-ar {
      /* margin-right: 0 !important; */
      /* margin-left: 20px !important; */

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
        <Global lang={lang} />
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
