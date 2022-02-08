/**
 * Footer
 * ------
 * extends: Block
 */

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import useMedia from 'use-media';

import Block from '../Block';
import Sitewidth from '../Sitewidth';
import { Paragraph, Link } from '../Text';

import twitterSrc from '../../assets/icons/twitter.svg';
import instagramSrc from '../../assets/icons/instagram.svg';
import facebookSrc from '../../assets/icons/facebook.svg';
import cardsSrc from '../../assets/icons/cards.svg';
import tabbySrc from '../../assets/icons/tabby.svg';
import maroofSrc from '../../assets/icons/maroof.png';

const getYear = () => new Date().getFullYear();

const Wrapper = styled(Block)`
  background: ${themeGet('colors.secondary.base')};
`;

const LayoutSitewidth = styled(Sitewidth)`
  justify-content: space-between;
  align-items: center;

  @media(min-width: ${themeGet('breakpoints.2')}) {
    flex-direction: row;
  }
`;

const Text = styled.div`
  & > :first-child { padding-bottom: 10px; }

  @media(max-width: ${themeGet('breakpoints.1')}) {
    & > :last-child {
      padding-bottom: 10px;
    }
  }
`;

const Image = styled.img`
  opacity: 0.8;
  width: 20px;
  height: 20px;
`;

const Privacy = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 -10px;
  flex: 1 0 auto;
  white-space: nowrap;

  button {
    margin: 0 10px;
    font-size: 12px;
    opacity: 0.35;
  }

  @media(max-width: ${themeGet('breakpoints.2')}) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 15px 0 0 0;
  }
`;

const Contact = styled.div`
  display: flex;

  & > a {
    margin: 0 10px;
    font-size: 12px;
    opacity: 0.5;
    color: ${themeGet('colors.white.base')};

    @media(max-width: ${themeGet('breakpoints.1')}) {
      margin: 10px 5px;
    }
  }
  @media(max-width: ${themeGet('breakpoints.1')}) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Icons = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: flex-end;
  order: -1;
  flex: 1 0 auto;

  @media(min-width: ${themeGet('breakpoints.1')}) {
    padding: ${themeGet('space.4')};
    flex-direction: row;
  }

  @media(min-width: ${themeGet('breakpoints.2')}) {
    order: 1;
  }

  & > ${Link} {
    margin-left: 10px;
    margin-right: 10px;
  }

  * {
    margin: 0 8px;
  }

  transform: translateX(5px);
  [data-lang="en"] & {
    transform: translateX(-5px);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width: ${themeGet('breakpoints.1')}) {
    & > span {
      display: none;
    }
  }

  @media(max-width: ${themeGet('breakpoints.2')}) {
    padding: ${themeGet('space.1')} 0;
  }
`;

const Payment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;

  img {
    height: 20px;
  }

  a, div {
    display: flex;
  }

  @media(min-width: 1024px) {
    margin-bottom: 10px;
  }
`;

function Footer({ data, className }) {
  const isDesktop = useMedia({ minWidth: 1024 });

  const ICONS = {
    facebook: facebookSrc,
    instagram: instagramSrc,
    twitter: twitterSrc,
    cards: cardsSrc,
    tabby: tabbySrc,
    maroof: maroofSrc,
  };

  return (
    <ThemeProvider theme={{ mode: 'dark' }}>
      <Wrapper py={[4, 5]} className={className}>
        <Payment>
          {data.payment.map((item) => {
            const Component = item.path.length > 0 ? 'a' : 'div';

            return (
              <Component
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={ICONS[item.name]}
                  alt={item.name}
                />
              </Component>
            );
          })}
        </Payment>
        <LayoutSitewidth>
          <Text>
            <Privacy>
              <Contact>
                {data.links.map((item, index) => (
                  <Link
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    as="a"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.text}
                  </Link>
                ))}
              </Contact>
            </Privacy>
            <Paragraph style={{ textAlign: isDesktop ? 'initial' : 'center' }}>
              <small style={{ opacity: 0.75 }}>
                {data.copyright[0]}
                {' '}
                {getYear()}
                {', '}
                {data.copyright[1]}
              </small>
            </Paragraph>
          </Text>
          <Icons>
            {data.social.map((item) => (
              <StyledLink
                key={item.link}
                as="a"
                href={item.link}
                target="_blank"
              >
                <Image src={ICONS[item.name]} />
              </StyledLink>
            ))}
          </Icons>
        </LayoutSitewidth>
      </Wrapper>
    </ThemeProvider>
  );
}

export default Footer;
