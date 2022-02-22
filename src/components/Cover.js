import React from 'react';
import styled, { css } from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

import Space from './Space';
import { Title, Paragraph } from './Text';
import { ButtonText } from './Button';
import ProductQuantity from './ProductQuantity';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: ${({ lang }) => (lang === 'en' ? 'flex-start' : 'flex-end')};
  text-align: ${({ lang }) => (lang === 'en' ? 'left' : 'right')};
  justify-content: flex-end;
  padding: 35px;
  pointer-events: none;

  ${({ active, clicked, index }) => (active ? css`
    opacity: 0;
    animation:
      coverFadeIn 1500ms ${(clicked ? 1000 : 0) + (index * 300)}ms forwards;
  ` : css`
    opacity: 1;
    animation: coverFadeOut 1500ms 500ms forwards;
  `)}

  @keyframes coverFadeIn {
    0% {
      opacity: 0;
      transform: translateY(5%);
    }
    100% { 
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes coverFadeOut {
    0% {
      opacity: 1;
      transform: translateY(5%);
    }
    100% { 
      opacity: 0;
      transform: translateY(0%);
    }
  }
`;

const Image = styled(GatsbyImage)`
  width: 100%;
  max-width: 230px;

  @media(min-width: 376px) {
    max-width: 350px;
  }
`;

const ButtonWrapper = styled.div`
  pointer-events: ${({ active }) => (active ? 'all' : 'none')};
`;

function Cover({
  image,
  title,
  text,
  button,
  active,
  clicked,
  setActive,
  index,
  setClicked,
  lang,
  product,
  sku,
  textSold,
  textRemaining,
  productStock,
}) {
  const productBySku = product.filter((p) => p.node.variants[0].sku === sku);
  const availableQuantity = productBySku[0].node.variants[0].inventoryQuantity;

  return (
    <Wrapper active={active} clicked={clicked} index={index} lang={lang}>
      {
        image
          ? (
            <>
              <Image
                image={image}
                alt={title}
              />
              <Space height="30px" />
            </>
          )
          : null
      }
      {
        title
          ? (
            <div style={{ width: '100%', maxWidth: 280 }}>
                <Title
                  as="h3"
                >
                  {title}
                </Title>
            </div>
          )
          : null
      }
      {text
        ? (
          <>
            <Space height="20px" />
            <Paragraph>
              {text}
            </Paragraph>
          </>
        )
        : null}
      <Space height="20px" />
      <ProductQuantity
        total={productStock}
        available={availableQuantity}
        lang={lang}
        textSold={textSold}
        textRemaining={textRemaining}
      />
      {
        button
          ? (
            <ButtonWrapper active={active}>
              <Space height="25px" />
              <ButtonText
                onClick={() => {
                  setActive(index);
                  setClicked(true);
                }}
                data-text={button}
              />
            </ButtonWrapper>
          )
          : null
      }
    </Wrapper>
  );
}

export default Cover;
