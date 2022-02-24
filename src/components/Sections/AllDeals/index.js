import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import TextBlock from '../../TextBlock';
import { ButtonText } from '../../Button';
import Sitewidth from '../../Sitewidth';
import Space from '../../Space';

const Wrapper = styled.div`
  background: ${themeGet('colors.secondary.shade.0')};
  padding: ${themeGet('space.6')} 0;
  direction: ${({ lang }) => (lang === 'en' ? 'ltr' : 'rtl')};
`;

const AllDeals = ({ title, text, buttonText, setActiveCoverScreen, lang }) => (
  <ThemeProvider theme={{ mode: 'dark' }}>
    <Wrapper lang={lang}>
      <Sitewidth>
        <TextBlock
          as="h2"
          title={title}
          text={text}
        />
        <Space height="50px" />
        <ButtonText
          data-text={buttonText}
          onClick={() => setActiveCoverScreen(null)}
        />
      </Sitewidth>
    </Wrapper>
  </ThemeProvider>
);

export default AllDeals;
