/**
 * Grid
 * ----
 */

import React, { useState } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { GatsbyImage } from 'gatsby-plugin-image';
import ReactPlayer from 'react-player';
import { useHotkeys } from 'react-hotkeys-hook';
import Modal from 'react-modal';

import iconPlay from '../../assets/icons/play-white.svg';
import iconClose from '../../assets/icons/x.svg';

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(${(props) => props.numberOfImages}, 50vw);
  grid-gap: 10px;
  
  
  @media(min-width: ${themeGet('breakpoints.0')}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(${(props) => props.numberOfImages}, 250px);
    
    & > :first-child {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
  
  @media(min-width: ${themeGet('breakpoints.1')}) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;

const Image = styled(GatsbyImage)`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
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
  `}
`;

const FeatureImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  ${({ hasVideo }) => hasVideo && css`
    cursor: pointer;
  
    transition: opacity 500ms;
    opacity: 1;

    &:hover {
      opacity: 0.8;
    }
  `};

  &:before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background: ${themeGet('colors.secondary.base')};
    opacity: 0.2;
    border-radius: 10px;
  }
`;

const Play = styled.img`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
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

function Gallery({ gallery, lang }) {
  const [isItemOpen, setIsOpenItem] = useState(false);
  useHotkeys('esc', () => setIsOpenItem(false));

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

  return (
    <Grid numberOfImages={gallery.gallery.length}>
      {gallery.gallery.map((item, index) => {
        if (item.type === 'image') {
          return (
            <Image
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              image={item.image.childImageSharp.gatsbyImageData}
              alt=""
            />
          );
        }
        const isOpen = isItemOpen === item.id;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            {isItemOpen ? <GlobalyStyle /> : null}
            {
              item.video
              ? (
                <ModalWrapper
                  isOpen={isOpen}
                  onClick={() => setIsOpenItem(false)}
                >
                  <Modal
                    isOpen={isOpen}
                    style={customStyles}
                    ariaHideApp={false}
                  >
                    <VideoContainer>
                      <PlayerWrapper>
                        <Player
                          url={item.video}
                          playing
                          playsinline
                          controls
                          width="100%"
                          height="100%"
                          onEnded={() => setIsOpenItem(false)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </PlayerWrapper>
                    </VideoContainer>
                  <Close
                    onClick={() => setIsOpenItem(false)}
                    src={iconClose}
                    alt=""
                    lang={lang}
                  />
                  </Modal>
                </ModalWrapper>
              )
              : null
            }
            <FeatureImage
              onClick={() => item.video && setIsOpenItem(item.id)}
              hasVideo={item.video.length > 0}
            >
              <Image
                image={item.image.childImageSharp.gatsbyImageData}
                alt=""
              />
              {item.video ? <Play src={iconPlay} /> : null}
            </FeatureImage>
          </div>
        );
      })}
    </Grid>
  );
}

export default Gallery;
