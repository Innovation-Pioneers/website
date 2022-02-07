import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Client from 'shopify-buy';

import { noJitter } from '../../utils';

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
`;

const Text = styled.div`
  position: relative;
  
  display: flex;
  align-items: center;
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

  @media (min-width: 375px) {
    min-width: 130px;
    max-width: 130px;
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
  height: 100%;

  cursor: pointer;
  transition: opacity 300ms;
  &:hover { opacity: 0.85; }
`;

const Price = styled.div`
  position: relative;
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  white-space: nowrap;
  padding: 0 10px;
  color: ${themeGet('colors.secondary.base')};
  transition: opacity 300ms;

  @media (min-width: 375px) {
    min-width: 170px;
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
  height: 100%;
`;

const Symbol = styled.div`
  ${noJitter};

  color: ${themeGet('colors.secondary.base')};
  padding: 16px 12px 16px 10px;

  cursor: pointer;
  transition: opacity 300ms;
  margin-top: -1px;
  font-size: 120%;
  &:hover { opacity: 0.4; }
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

export const Quantity = React.createContext(null);

const ButtonCheckout = styled(({
  text,
  price,
  currency,
  className,
  variantId,
}) => {
  const { quantity, setQuantity } = useContext(Quantity);

  const handleCheckout = async () => {
    const POPUP = window.open();

    const client = Client.buildClient({
      domain: 'checkout.lag6a.com',
      storefrontAccessToken: '2852f2ee022208a16a87322fc6f251a2',
    });

    async function createCheckout() {
      const { id: checkoutId } = await client.checkout.create();
      const checkoutWithProducts = await client.checkout.addLineItems(
        checkoutId,
        [
          {
            variantId,
            quantity,
          },
        ]
      );

      POPUP.location = checkoutWithProducts.webUrl;
      setQuantity(1);
    }

    createCheckout();
  };

  return (
    <Wrapper className={className}>
      <Text onClick={handleCheckout}><span>{text}</span></Text>
      <Price className="price">
        <Symbol onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          -
        </Symbol>
        {currency}
        {' '}
        {(quantity * price).toFixed(2)}
        <Symbol onClick={() => setQuantity(quantity + 1)}>
          +
        </Symbol>
        {quantity > 0
          && (
          <Notification quantity={quantity > 1 ? true : false}>
            {Math.max(quantity, 2)}
          </Notification>
        )}
      </Price>
    </Wrapper>
  );
})(css`
`);

export default ButtonCheckout;
