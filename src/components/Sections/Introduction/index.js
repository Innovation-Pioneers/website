/* eslint-disable react/jsx-closing-bracket-location */
/**
 * Introduction
 * ------------
 * extends: Block
 */

import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { GatsbyImage } from 'gatsby-plugin-image';

import TextBlock from '../../TextBlock';
import Sitewidth from '../../Sitewidth';
import { ButtonIcon, ButtonCheckout } from '../../Button';
import Modal from '../../Modal';
import VideoPlayer from '../../VideoPlayer';
import Space from '../../Space';
import ProductQuantity from '../../ProductQuantity';

const Wrapper = styled.div`
  display: flex;
  background: ${themeGet('colors.primary.base')};

  @media(min-width: ${themeGet('breakpoints.2')}) {
    padding: ${themeGet('space.7')} 0;
  }
`;

const LayoutSitewidth = styled(Sitewidth)`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media(max-width: ${themeGet('breakpoints.2')}) {
    flex-direction: column-reverse;

    align-items: flex-end;
    [data-lang="en"] & {
      align-items: flex-start;
    }
  }
`;

const ImageWidth = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 120%;

  @media(min-width: ${themeGet('breakpoints.2')}){
    transform: translateX(10%) scale(1.1);
  }

  @media(min-width: ${themeGet('breakpoints.3')}){
    transform: translateX(20%) scale(1.2);
  }

  z-index: 99;
`;

const Image = styled(GatsbyImage)`
  width: 100%;
  height: 100%;

  * { overflow: visible !important; }
  img { object-fit: contain !important; }
`;

const ProductImage = styled.div`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  transform-origin: center 80%;
  transform: scale(1.1);
  pointer-events: none;
`;

const Content = styled.div`
  flex: 1 0 auto;

  @media(min-width: ${themeGet('breakpoints.2')}) {
    &:first-child {
      max-width: 550px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  position: relative;
  z-index: 1;
  padding-top: ${themeGet('space.5')};
  padding-bottom: ${themeGet('space.6')};
  background: ${themeGet('colors.primary.base')};

  @media(max-width: ${themeGet('breakpoints.1')}) {
    flex-direction: column;

    ${ButtonCheckout}{
      height: 56px;
    }
  }
`;

// eslint-disable-next-line react/function-component-definition
const Introduction = ({
  data,
  buyButton,
  tutorialButton,
  className,
  lang,
  availableQuantity,
  textSold,
  textRemaining,
  productStock,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let hackedVideoPath;
  // Since Gatsby cant resolve path normally
  if (data.video.startsWith('https://')) {
    hackedVideoPath = data.video;
  } else {
    hackedVideoPath = data?.video?.split('/static')[1]; // @ HACK
  }

  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Wrapper>
        <LayoutSitewidth>
          <Content className={className}>
            <TextBlock
              title={data.title}
              subtitle={data.subtitle}
              text={data.text}
              as="h2"
            />
            <Space height="25px" />
            <ProductQuantity
              total={productStock}
              available={availableQuantity}
              textSold={textSold}
              textRemaining={textRemaining}
              />
            <Buttons>
              <ButtonCheckout
                className="introduction-buyButton-ar"
                text={buyButton.text}
                textSoldOut={buyButton.textSoldOut}
                price={parseInt(buyButton.price, 10)}
                currency={buyButton.currency}
                variantId={buyButton.variantId}
                disabled={availableQuantity <= 0}
              />
              {
                data.video
                ? (
                  <ButtonIcon
                    data-text={tutorialButton.watchVideo}
                    // fix bottom line
                    data-icon={tutorialButton.watchVideoIcon}
                    onClick={() => setIsModalOpen(true)}
                  />
                )
                : null
              }
            </Buttons>
          </Content>
          <ImageWidth>
            <ImageWrapper>
              <ProductImage>
                <Image
                  image={data.image?.childImageSharp?.gatsbyImageData}
                  alt={data.title}
                />
              </ProductImage>
            </ImageWrapper>
          </ImageWidth>
        </LayoutSitewidth>
        {
          data.video
            ? (
              <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                ariaHideApp={false}
                lang={lang}
                onRequestClose={() => setIsModalOpen(false)}
              >
                <VideoPlayer
                  url={hackedVideoPath}
                  playing
                  playsinline
                  controls
                  width="100%"
                  height="100%"
                  onEnded={() => setIsModalOpen(false)}
                  onClick={(e) => e.stopPropagation()}
                />
              </Modal>
            )
            : null
        }
      </Wrapper>
    </ThemeProvider>
  );
};

export default Introduction;
