/**
 * Store
 * -----
 */

import React from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { GatsbyImage } from 'gatsby-plugin-image';

import Block from '../Block';
import TextBlock from '../TextBlock';
import { Title } from '../Text';
import Space from '../Space';

const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: ${themeGet('space.5')};

  @media(max-width: ${themeGet('breakpoints.2')}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: ${themeGet('space.6')};
`;

const ImageWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 25px;

  @media(min-width: ${themeGet('breakpoints.1')}) {
    flex-direction: row;
  }

  @media(min-width: ${themeGet('breakpoints.3')}) {
    justify-content: space-between;
  }
`;

const Image = styled(GatsbyImage)`
  width: 100%;
  max-width: 300px;
`;

const Logos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
`;

const Label = styled.p`
  font-weight: ${({ lang }) => (lang === 'en' ? 400 : 300)};
  text-align: center;
  line-height: 24px;
`;

function Store({ store, className, lang }) {
  return (
    <Block className={className} style={{ gap: 50 }}>
      <Text>
        <TextBlock
          title={store.title}
          text={store.text}
        />
      </Text>
      {
        store.items
          ? (
            <Content>
              <ImageWrap>
                {store.items.map((item) => {
                  const { title, subtitle, image, description } = item;

                  return (
                    <Logos key={title}>
                      <Image
                        image={image.childImageSharp.gatsbyImageData}
                        alt={title || description || ''}
                      />
                      {
                        title
                          ? (
                            <>
                              <Space height="50px" />
                              <Title
                                as="h5"
                                style={{ textAlign: 'center' }}
                              >
                                {title}
                              </Title>
                            </>
                          )
                          : null
                      }
                      {
                        subtitle
                          ? (
                            <>
                              <Space height="10px" />
                              <Label
                                lang={lang}
                                style={{ opacity: 0.5 }}
                              >
                                {subtitle}
                              </Label>
                            </>
                          )
                          : null
                      }
                      {
                        description
                          ? (
                            <>
                              <Space height="40px" />
                              <Label lang={lang}>{description}</Label>
                            </>
                          )
                          : null
                      }
                    </Logos>
                  );
                })}
              </ImageWrap>
            </Content>
          )
          : null
      }
    </Block>
  );
}

export default Store;
