/**
 * Grid
 * ----
 */

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { GatsbyImage } from 'gatsby-plugin-image';
import ReactPlayer from 'react-player';

import Modal from '../Modal';

import iconPlay from '../../assets/icons/play-white.svg';

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

function Gallery({ gallery, lang }) {
  const [isItemOpen, setIsOpenItem] = useState();

  return (
    <Grid numberOfImages={gallery.gallery.length}>
      {gallery.gallery.map((item, index) => {
        let hackedVideoPath;
        // Since Gatsby cant resolve path normally
        if (item.video.startsWith('https://')) {
          hackedVideoPath = item.video;
        } else {
          hackedVideoPath = item?.video?.split('/static')[1]; // @ HACK
        }

        if (item.type === 'image') {
          return (
            <Image
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              image={item.image?.childImageSharp?.gatsbyImageData}
              alt=""
            />
          );
        }

        const isOpen = isItemOpen === item;

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            {
              item.video
              ? (
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpenItem}
                  ariaHideApp={false}
                  lang={lang}
                  onRequestClose={() => setIsOpenItem(false)}
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
                        onEnded={() => setIsOpenItem(false)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </PlayerWrapper>
                  </VideoContainer>
                </Modal>
              )
              : null
            }
            <FeatureImage
              onClick={() => item.video && setIsOpenItem(item)}
              hasVideo={item?.video.length > 0}
            >
              <Image
                image={item.image?.childImageSharp?.gatsbyImageData}
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
