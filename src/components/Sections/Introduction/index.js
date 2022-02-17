/* eslint-disable react/jsx-closing-bracket-location */
/**
 * Introduction
 * ------------
 * extends: Block
 */

import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { GatsbyImage } from 'gatsby-plugin-image';
import ReactPlayer from 'react-player';

import TextBlock from '../../TextBlock';
import Sitewidth from '../../Sitewidth';
import { ButtonIcon, ButtonCheckout } from '../../Button';
import Modal from '../../Modal';

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
  position: relative;
  z-index: 1;
  padding-top: ${themeGet('space.6')};
  padding-bottom: ${themeGet('space.6')};
  background: ${themeGet('colors.primary.base')};

  @media(max-width: ${themeGet('breakpoints.1')}) {
    flex-direction: column;

    ${ButtonCheckout} {
      margin-bottom: 20px;
    }

    ${ButtonCheckout}{
      height: 56px;
    }
  }

  ${ButtonCheckout} {
    @media(min-width: ${themeGet('breakpoints.1')}) {
      margin-right: 20px;
    }
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 720 / 1280 = 0.5625 */
`;

const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const GlobalyStyle = createGlobalStyle`
  body, html {
    overflow: hidden;
  }
`;

// eslint-disable-next-line react/function-component-definition
const Introduction = ({ data, buyButton, tutorialButton, className, lang }) => {
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
        {isModalOpen ? <GlobalyStyle /> : null}
        <LayoutSitewidth>
          <Content className={className}>
            <TextBlock
              title={data.title}
              subtitle={data.subtitle}
              text={data.text}
              as="h2"
            />
            <Buttons>
              <ButtonCheckout
                className="introduction-buyButton-ar"
                text={buyButton.text}
                price={parseInt(buyButton.price, 10)}
                currency={buyButton.currency}
                variantId={buyButton.variantId}
              />
              {
                data.video
                ? (
                  <ButtonIcon
                    data-text={tutorialButton.text}
                    // fix bottom line
                    data-icon={tutorialButton.icon}
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
                <VideoContainer>
                  <PlayerWrapper>
                    <Player
                      url={hackedVideoPath}
                      playing
                      playsinline
                      controls
                      width="100%"
                      height="100%"
                      onEnded={() => setIsModalOpen(false)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </PlayerWrapper>
                </VideoContainer>
              </Modal>
            )
            : null
        }
      </Wrapper>
    </ThemeProvider>
  );
};

export default Introduction;
