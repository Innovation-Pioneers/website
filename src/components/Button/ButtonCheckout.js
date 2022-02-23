import React, { useMemo, useContext } from 'react';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { noJitter } from '../../utils';
import { decimalize } from '../../helpers';
import { Title } from '../Text';

import minusSrc from '../../assets/icons/minus.svg';
import plusSrc from '../../assets/icons/plus.svg';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  color: ${themeGet('colors.white.base')};
  font-size: ${themeGet('fontSizes.1')};
  font-weight: ${themeGet('fontWeights.regular')};
  min-width: 300px;

  @media(min-width: ${themeGet('breakpoints.1')}) {
    min-width: 350px;
  }

  max-width: ${({ maxWidth }) => maxWidth};
`;

const Text = styled.div`
  position: relative;
  
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 17px 24px;
  color: ${themeGet('colors.black.base')};

  border-bottom-right-radius: 100px;
  border-top-right-radius: 100px;
  [data-lang="en"] & {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 100px;
    border-top-left-radius: 100px;
  }

  @media (min-width: 360px) {
    min-width: 155px;
    max-width: 155px;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0; right: 0;
    height: 80%;

    border-left: 1px solid ${themeGet('colors.secondary.shade.4')};
    [data-lang="en"] & {
      border-right: 1px solid ${themeGet('colors.secondary.shade.4')};
      border-left: none;
    }
  }

  background: ${themeGet('colors.white.base')};
  height: 50px;

  cursor: pointer;
  transition: opacity 300ms;
  &:hover { opacity: 0.85; }
`;

const Price = styled.div`
  position: relative;
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  padding: 0;
  color: ${themeGet('colors.secondary.base')};
  transition: opacity 300ms;

  @media (min-width: 376px) {
    min-width: 200px;
    padding: 0 10px;
  }

  @media(min-width: 768px) {
    flex: 1 1 auto;
  }
  
  border-bottom-left-radius: 100px;
  border-top-left-radius: 100px;
  [data-lang="en"] & {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 100px;
    border-top-right-radius: 100px;
  }

  background: ${themeGet('colors.white.base')};
  height: 50px;
`;

const Symbol = styled.div`
  ${noJitter};
  display: flex;

  color: ${themeGet('colors.secondary.base')};
  padding: 16px 8px;

  cursor: pointer;
  transition: opacity 300ms;
  margin-top: -1px;
  font-size: 120%;
  &:hover { opacity: 0.4; }

  @media(min-width: ${themeGet('brealpoints.0')}) {

    padding: 16px 12px;
  }
`;

const Notification = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: auto;
  [data-lang="en"] & {
    right: -10px;
    left: auto;
  }
  width: 30px;
  height: 30px;
  border-radius: 300px;
  background: ${themeGet('colors.secondary.base')};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${themeGet('colors.white.base')};

  opacity: 0;
  transform: translateY(10%) scale(0.85);
  transition: opacity 500ms, transform 500ms;
  ${(props) => props.quantity > 0 && css`
    opacity: 1;
    transform: translateY(0) scale(0.85);
  `}
`;

const Flex = styled.div`
  display: flex;
  ${Title} {
    display: flex;
    align-items: center;
    text-transform: uppercase;
  }
`;

export const Cart = React.createContext({
  items: [],
});

const ButtonCheckout = styled(({
  text,
  textSoldOut,
  price,
  currency,
  className,
  variantId,
  disabled,
  maxWidth,
}) => {
  const { state, setState } = useContext(Cart);

  const addItemToCart = (id, q = 1) => {
    let productAlreadyInCart = false;
    const items = state.items.map((item) => {
      const { variantId: itemId, quantity } = item;
      if (itemId === id) {
        productAlreadyInCart = true;
        const newQuantity = quantity + q;
        return {
          variantId: itemId,
          quantity: newQuantity,
          price: price * newQuantity,
        };
      }
      return item;
    });

    if (!productAlreadyInCart) {
      items.push({
        variantId: id,
        quantity: q,
        price,
      });
    }

    setState({ items });
  };

  const removeFromCart = (id, q = 1) => {
    const items = state.items.reduce(
      (agr, item) => {
        if (item.variantId === id) {
          const newQuantity = item.quantity - q;
          if (newQuantity > 0) {
            agr.push({
              ...item,
              quantity: newQuantity,
              price: price * newQuantity,
            });
          }
        } else {
          agr.push(item);
        }
        return agr;
      },
      [],
    );

    setState({ items });
  };

  const quantity = useMemo(() => {
    const item = state.items.find(
      ({ variantId: itemId }) => variantId === itemId
    );
    if (item) {
      return item.quantity;
    }
    return 0;
  }, [state]);

  const priceToShow = (
    quantity > 0
    ? decimalize(quantity * price)
    : decimalize(price)
  );

  return (
    <Flex>
      {
        disabled
          ? (
            <Title
              as="h3"
            >
              {textSoldOut}
            </Title>
          )
          : (
            <Wrapper
              className={className}
              disabled={disabled}
              maxWidth={maxWidth}
            >
              <Text onClick={() => addItemToCart(variantId, 1)}>
                {text}
              </Text>
              <Price className="price">
                <Symbol onClick={() => removeFromCart(variantId, 1)}>
                  <img src={minusSrc} alt="minus" />
                </Symbol>
                {currency}
                {' '}
                {priceToShow}
                <Symbol onClick={() => addItemToCart(variantId, 1)}>
                  <img src={plusSrc} alt="plus" />
                </Symbol>
                {quantity > 0
                  && (
                  <Notification quantity={quantity >= 1 ? true : false}>
                    {Math.max(quantity, 1)}
                  </Notification>
                )}
              </Price>
            </Wrapper>
          )
      }
    </Flex>
  );
})(css`
`);

export default ButtonCheckout;
