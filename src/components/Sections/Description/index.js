/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { GatsbyImage } from 'gatsby-plugin-image';

import Sitewidth from '../../Sitewidth';
import TextBlock from '../../TextBlock';
import { ButtonCheckout } from '../../Button';

const Wrapper = styled.div`
  background: ${themeGet('colors.primary.base')};
  padding-top: ${themeGet('space.5')};

  @media(min-width: ${themeGet('breakpoints.1')}) {
    padding-bottom: ${themeGet('space.5')};
  }
`;

const LayoutSitewidth = styled(Sitewidth)`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media(max-width: ${themeGet('breakpoints.2')}) {
    flex-direction: column-reverse;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  ${ButtonCheckout} {
    margin-top: ${themeGet('space.6')};
  }

  & > ${ButtonCheckout} {
    @media(max-width: ${themeGet('breakpoints.1')}) {
      height: 56px;
      width: 100%;
      margin-bottom: ${themeGet('space.6')};
    }
  }
`;

const ImageWidth = styled.div`
  width: 100%;
  max-width: 600px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 120%;
  transform-origin: bottom left;
  transform: scale(1.2);

  @media (max-width: ${themeGet('breakpoints.2')}) {
    transform: scale(1);
  }
`;

const Image = styled(GatsbyImage)`
  width: 100%;
  height: 100%;

  img { object-fit: contain !important; }
`;

const ProductImage = styled.div`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  transform-origin: center 80%;
`;

function Footer({ data, buyButton, className }) {
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Wrapper>
        <LayoutSitewidth>
          <Content className={className}>
            <TextBlock
              title={data.title}
              subtitle={data.subtitle}
              text={data.text}
            />
            <ButtonCheckout
              className="introduction-buyButton-ar"
              text={buyButton.text}
              price={parseInt(buyButton.price, 10)}
              currency={buyButton.currency}
              variantId={buyButton.variantId}
            />
          </Content>
          <ImageWidth>
            <ImageWrapper>
              <ProductImage
              >
                <Image image={data.images[0].childImageSharp.gatsbyImageData} />
              </ProductImage>
            </ImageWrapper>
          </ImageWidth>
        </LayoutSitewidth>
      </Wrapper>
    </ThemeProvider>
  );
}
export default Footer;
