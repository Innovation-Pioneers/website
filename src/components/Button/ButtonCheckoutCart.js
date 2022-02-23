import React, { useMemo, useContext } from 'react';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Client from 'shopify-buy';

import { decimalize } from '../../helpers';

import { Cart } from './ButtonCheckout';

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
  min-width: 330px;

  @media(min-width: ${themeGet('breakpoints.1')}) {
    min-width: 350px;
  }
`;

const Text = styled.div`
  position: relative;
  
  display: flex;
  align-items: center;
  flex: 1;
  padding: 17px 24px;
  color: ${themeGet('colors.black.base')};

  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

  border-bottom-right-radius: 100px;
  border-top-right-radius: 100px;
  [data-lang="en"] & {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 100px;
    border-top-left-radius: 100px;
  }

  @media (min-width: 375px) {
    min-width: 140px;
    max-width: 140px;
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
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  height: 50px;
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

const WrapperSvg = styled.div`
  padding: 11px;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

  svg {
    transition: 300ms stroke;
    stroke: ${({ disabled }) => (disabled ? '#C4C4C4' : '#000000')};
  }

  &:hover {
    svg {
      stroke: #999999;
    };
  }
`;

function ClearCartIcon({ onClick, disabled }) {
  return (
    <WrapperSvg onClick={onClick} disabled={disabled}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C4C4C4"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-x"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </WrapperSvg>
  );
}

const ButtonCheckoutCart = styled(({
  className,
  text,
  textTotal,
  currency,
}) => {
  const { state, setState } = useContext(Cart);

  const handleCheckout = async () => {
    const client = Client.buildClient({
      domain: 'checkout.lag6a.com',
      storefrontAccessToken: '2852f2ee022208a16a87322fc6f251a2',
    });

    async function createCheckout() {
      const itemsMap = state.items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));
      const { id: checkoutId } = await client.checkout.create();
      const checkoutWithProducts = await client.checkout.addLineItems(
        checkoutId,
        itemsMap,
      );

      if (typeof window !== 'undefined') {
        window.location = checkoutWithProducts.webUrl;
      }
      setState({ items: [] });
    }

    createCheckout();
  };

  const clearCart = () => setState({ items: [] });

  const quantity = useMemo(
    () => ((state.items || []).reduce(
        // eslint-disable-next-line no-return-assign
        (agr, item) => (agr += item.quantity), 0
      )
    ),
    [state],
  );

  const totalPrice = useMemo(
    () => ((state.items || []).reduce(
      // eslint-disable-next-line no-return-assign
        (agr, item) => (agr += item.price), 0
      )
    ),
    [state]
  );

  return (
    <Wrapper className={className}>
      <Text
        disabled={quantity <= 0}
        onClick={handleCheckout}
      >
        {text}
      </Text>
      <Price className="price">
        {`${textTotal}: ${currency} ${decimalize(totalPrice)}`}
        <ClearCartIcon onClick={() => clearCart()} disabled={quantity <= 0} />
        {quantity > 0
          && (
          <Notification quantity={quantity >= 1 ? true : false}>
            {Math.max(quantity, 1)}
          </Notification>
        )}
      </Price>
    </Wrapper>
  );
})(css`
`);

export default ButtonCheckoutCart;
