/* eslint-disable react/jsx-closing-bracket-location */
/**
 * Introduction
 * ------------
 * extends: Block
 */

import React, { useState } from 'react';
import
  styled,
  {
    css,
    ThemeProvider,
    createGlobalStyle,
  } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { GatsbyImage } from 'gatsby-plugin-image';
import ReactPlayer from 'react-player';
import { useHotkeys } from 'react-hotkeys-hook';
import Modal from 'react-modal';

import TextBlock from '../../TextBlock';
import Sitewidth from '../../Sitewidth';
import { ButtonIcon, ButtonCheckout } from '../../Button';

import iconClose from '../../../assets/icons/x.svg';

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

const ModalWrapper = styled.div`
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background: hsla(0, 0%, 5%, 0.8);
  z-index: 999999999;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms;
  ${(props) => props.isOpen && css`
    opacity: 1;
    pointer-events: all;
    z-index: 9999999999;
  `}
`;

const Close = styled.img`
  position: absolute;
  z-index: 99999999999;
  pointer-events: all;
  top: 25px;
  right: ${({ lang }) => (lang === 'en' ? '25px' : 'auto')};
  left: ${({ lang }) => (lang === 'en' ? 'auto' : '25px')};

  width: 50px;
  height: 50px;
  margin: 5px;
  cursor: pointer;

  transition: opacity 500ms;
  opacity: 1;

  &:hover { opacity: 0.5; }
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 0 25px;
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

function Introduction({ data, buyButton, tutorialButton, className, lang }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useHotkeys('esc', () => setIsModalOpen(false));

  const customStyles = {
    overlay: {
      background: 'none',
      zIndex: 9,
    },
    content: {
      border: 'none',
      background: 'none',
      borderRadius: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  const hackedVideoPath = data.video.split('/static')[1]; // @ HACK
  // Since Gatsby cant resolve path normally

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
                  image={data.image.childImageSharp.gatsbyImageData}
                  alt={data.title}
                />
              </ProductImage>
            </ImageWrapper>
          </ImageWidth>
        </LayoutSitewidth>
        {
          data.video
            ? (
              <ModalWrapper
                isOpen={isModalOpen}
                onClick={() => setIsModalOpen(false)}
              >
                <Modal
                  isOpen={isModalOpen}
                  style={customStyles}
                  ariaHideApp={false}
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
                <Close
                  onClick={() => setIsModalOpen(false)}
                  src={iconClose}
                  alt=""
                  lang={lang}
                />
                </Modal>
              </ModalWrapper>
            )
            : null
        }
      </Wrapper>
    </ThemeProvider>
  );
}

export default Introduction;
