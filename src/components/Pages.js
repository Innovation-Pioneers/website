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
// import comingSoonSrc1 from '../assets/images/coming-soon-1.png';
// import comingSoonSrc2 from '../assets/imagescoming-soon-2.png';

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

    /* height: ${({ active }) => (active ? 'auto' : '100vh')}; */
    height: ${({ active, clicked }) => (
      active
        ? 'auto'
        : !clicked
          ? '100vh'
          : 0
      )};
  }
`;

// const ComingSoon = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   flex: ${({ flex }) => flex} 1 auto;
//   overflow: hidden;
//   height: 100vh;
//   transition: all 1500ms cubic-bezier(0.785, 0.135, 0.000, 1.000);
//   pointer-events: none;
//   width: 0;
//   min-width: ${({ clicked }) => (clicked ? 0 : '31vw')};

//   @media (max-width: 1024px) {
//     width: 100%;
//     height: ${({ active }) => (active ? '30vh' : '0vh')};
//   }

//   > img {
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     height: 100%;
//     width: 100%;
//     object-fit: cover;
//   }
// `;

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

function Pages({
  data: {
    pageData,
    productData,
    product,
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
              <LanguageSwitch
                to={lang === 'en' ? '/' : '/en'}
                fontFamily={lang === 'en' ? 'GESSTwo' : 'Montserrat'}
              >
            {lang === 'en' ? 'عربى' : 'English'}
              </LanguageSwitch>
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
                }}
                lang={lang}
                className={className}
                active={active === index}
                clicked={clicked && active === index}
                flex={active === index ? 1 : 0}
              />
              {active === null && (
                <Cover
                  image={
                    item.node.frontmatter.cover.image.childImageSharp
                    .gatsbyImageData
                  }
                  title={item.node.frontmatter.cover.title}
                  text={item.node.frontmatter.cover.text}
                  button={item.node.frontmatter.cover.button}
                  active={active !== index}
                  clicked={clicked && active === index}
                  setActive={setActive}
                  setClicked={setClicked}
                  index={index}
                  lang={lang}
                />
              )}
            </PageWrapper>
          </ThemeProvider>
        );
      })}
      {/* {[comingSoonSrc2].map((item, index) => (
        <ComingSoon
          key={item}
          flex={active === null ? 1 : 0}
          active={active === null}
          clicked={clicked}
        >
          <img src={item} alt="coming soon" />
          {active === null && (
            <Cover
              title={lang === 'en' ? 'DEAL COMING SOON' : 'صفقة قريبا'} // @TODO: Add to dictionary
              active={active === null}
              index={index + productData.length}
              clicked={clicked}
              lang={lang}
            />
          )}
        </ComingSoon>
      ))} */}
    </Wrapper>
  );
}

export default Pages;
