import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Link as GatsbyLink } from 'gatsby';

import defaultTheme from '../theme';
import { createColor } from '../theme/helpers';

import Page from './Page';
import Cover from './Cover';

import logoSrcEn from '../assets/logos/logo-en.svg';
import logoSrcAr from '../assets/logos/logo-ar.svg';
import maroofSrc from '../assets/icons/maroof.png';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${({ lang }) => (lang === 'en' ? 'row' : 'row-reverse')};
  overflow: auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: ${({ flex }) => flex} 1 auto;
  overflow: hidden;
  height: ${({ active }) => (active ? 'auto' : '100vh')};
  background: ${({ theme }) => theme.colors.primary.base};
  transition: flex 1500ms cubic-bezier(0.785, 0.135, 0.000, 1.000);
  width: 0;
  min-width: ${({ clicked }) => (clicked ? 0 : '31vw')};

  ${({ active }) => active && css`
    animation: fadeColor 1000ms 500ms forwards;
  `}

  @keyframes fadeColor {
    100% {
      background: white;
    }
  }

  @media (max-width: 1024px) {
    width: 100%;

    height: ${({ active, clicked }) => (
      active
        ? 'auto'
        : !clicked
          ? '100vh'
          : 0
      )};
  }
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === 'en' ? 'row' : 'row-reverse')};
  justify-content: space-between;
  align-items: flex-start;

  position: ${({ active }) => (active ? 'fixed' : 'absolute')};
  z-index: 1;

  width: 100%;
  padding: 25px;
  pointer-events: none;

  @media (max-width: 1024px) {
    position: absolute;
  }
`;

const Logo = styled.img`
  width: 100px;
  pointer-events: initial;
  cursor: pointer;
  pointer-events: ${({ active }) => (active ? 'none' : 'all')};

  @media(min-width: ${themeGet('breakpoints.2')}) {
    width: 165px;
    height: 100px;
  }
`;

const LanguageSwitch = styled(GatsbyLink)`
  pointer-events: initial;
  color: ${themeGet('colors.black.base')};
  font-weight: ${themeGet('fontWeights.regular')};
  white-space: nowrap;

  ${(props) => props.fontFamily && css`font-family: ${props.fontFamily};`};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

function Pages({
  data: {
    pageData,
    productData,
    product,
    settings,
  },
  lang,
  className,
}) {
  const [active, setActive] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [clicked]);
  return (
    <Wrapper lang={lang}>
      <TopBar lang={lang} active={active === null}>
        <Logo
          src={lang === 'en' ? logoSrcEn : logoSrcAr}
          lang={lang}
          onClick={() => {
            setActive(null);
            setClicked(false);
          }}
          active={active === null}
        />
        {
          active === null
            ? (
              <Actions>
                <LanguageSwitch
                  to={lang === 'en' ? '/' : '/en'}
                  fontFamily={lang === 'en' ? 'GESSTwo' : 'Montserrat'}
                >
                  {lang === 'en' ? 'عربى' : 'English'}
                </LanguageSwitch>
                <a
                  href="https://maroof.sa/215084"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ pointerEvents: 'all' }}
                >
                  <img src={maroofSrc} alt="" width={60} />
                </a>
              </Actions>
          )
          : null
        }
      </TopBar>
      {productData.map((item, index) => {
        const theme = {
          ...defaultTheme,
          colors: {
            ...defaultTheme.colors,
            primary: createColor(item.node.frontmatter.color),
          },
        };

        return (
          <ThemeProvider
            key={item.node.frontmatter.sku}
            theme={theme}
          >
            <PageWrapper
              active={active === index}
              flex={active === null ? 1 : active === index ? 1 : 0}
              clicked={clicked}
            >
              <Page
                data={{
                  pageData,
                  productData: item.node.frontmatter,
                  product: product.filter(
                    (p) => p.node.variants[0].sku === item.node.frontmatter.sku
                  ),
                  settings,
                }}
                lang={lang}
                className={className}
                active={active === index}
                clicked={clicked && active === index}
                flex={active === index ? 1 : 0}
                setActiveCoverScreen={setActive}
              />
              {active === null && (
                <Cover
                  image={
                    item.node.frontmatter.cover
                    .image?.childImageSharp?.gatsbyImageData
                  }
                  title={item.node.frontmatter.cover.title}
                  text={item.node.frontmatter.cover.text}
                  button={settings.buttons.getTheDeal}
                  active={active !== index}
                  clicked={clicked && active === index}
                  setActive={setActive}
                  setClicked={setClicked}
                  index={index}
                  lang={lang}
                  product={product}
                  sku={item.node.frontmatter.sku}
                  textSold={settings.texts.sold}
                  textRemaining={settings.texts.remaining}
                  productStock={item.node.frontmatter.stock}
                />
              )}
            </PageWrapper>
          </ThemeProvider>
        );
      })}
    </Wrapper>
  );
}

export default Pages;
