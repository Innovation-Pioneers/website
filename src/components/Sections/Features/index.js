import React from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Element } from 'react-scroll';
import { GatsbyImage } from 'gatsby-plugin-image';

import Block from '../../Block';
import TextBlock from '../../TextBlock';
import Sitewidth from '../../Sitewidth';
import Slider from '../../Slider';

const Wrapper = styled.div`
  padding: ${themeGet('space.4')} 0;

  @media(min-width: ${themeGet('breakpoints.2')}) {
    padding: ${themeGet('space.7')} 0 ${themeGet('space.3')} 0;
  }
`;

const LayoutSitewidth = styled(Sitewidth)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  display: flex;
  width: 100%;
  padding: ${themeGet('space.5')} 0;
`;

const Content = styled(Block)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media(max-width: ${themeGet('breakpoints.1')}) {
    flex-direction: column-reverse;

    & > :first-child {
      padding-top: ${themeGet('space.6')};
    }
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  max-width: 500px;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function Features({ data, slides, className }) {
  const hackedVideoPath = data?.video?.split('/static')[1]; // @ HACK
  // Since Gatsby cant resolve path normally

  return (
    <Wrapper>
      <Element name="features" />
      <LayoutSitewidth>
        <Text>
          <TextBlock
            className={className}
            title={data.title}
            subtitle={data.subtitle}
            text={data.text}
          />
        </Text>
        <Content pl={[null, null, 7]} py={[4, 5, 6]}>
          <Slider slides={slides} className={className} />
          <VideoWrapper>
            {data.video
              ? (
                <Video
                  autoPlay
                  playsInline
                  muted
                  loop
                  src={hackedVideoPath}
                  type="video/mp4"
                />
              ) : (
                <GatsbyImage
                  image={data.image?.childImageSharp?.gatsbyImageData}
                  alt={data.title}
                />
              )}
          </VideoWrapper>
        </Content>
      </LayoutSitewidth>
    </Wrapper>
  );
}
export default Features;
