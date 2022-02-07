import React from 'react';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Link as ScrollLink } from 'react-scroll';
import { Link as GatsbyLink } from 'gatsby';

import { ButtonCheckout } from '../Button';
import { Link } from '../Text';
import Space from '../Space';

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${themeGet('space.4')};
  background: ${themeGet('colors.primary.base')};

  @media(min-width: ${themeGet('breakpoints.2')}) {
    padding: ${themeGet('space.6')};
  }

  @media(min-width: ${themeGet('breakpoints.2')}) {
    & > a {
      display: none;
    }
  }
`;

const Row = styled.div`    
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  justify-content: flex-end;
  
  @media(max-width: ${themeGet('breakpoints.2')}) {
    display: none;
  }
  
  & > :last-child {
    margin: 0 10px;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  @media(min-width: ${themeGet('breakpoints.2')}) {
    width: auto;
    & > a {
      display: none;
    }
  }
`;

const Item = styled(Link)`
  padding: 10px 20px;
  color: ${themeGet('colors.black.base')};
  font-weight: ${themeGet('fontWeights.regular')};
  white-space: nowrap;

  ${(props) => props.fontFamily && css`font-family: ${props.fontFamily};`};
`;

function Navigation({ /* social, */ items, buyButton, className, lang }) {
  return (
    <Header className={className}>
      <LogoContainer>
        <Item
          as={GatsbyLink}
          to={lang === 'en' ? '/' : '/en'}
          fontFamily={lang === 'en' ? 'GESSTwo' : 'Montserrat'}
        >
          {lang === 'en' ? 'عربى' : 'English'}
        </Item>
      </LogoContainer>
      <Row>
        {items.map((item) => (
          <Item
            key={item.name}
            as={ScrollLink}
            to={item.path}
            smooth="easeOutQuart"
            duration={1000}
            offset={-50}
          >
            {item.name}
          </Item>
        ))}
        <Item
          as={GatsbyLink}
          to={lang === 'en' ? '/' : '/en'}
          fontFamily={lang === 'en' ? 'GESSTwo' : 'Montserrat'}
        >
          {lang === 'en' ? 'عربى' : 'English'}
        </Item>
        <Space width="30px" />
        <ButtonCheckout
          className="introduction-buyButton-ar"
          text={buyButton.text}
          price={parseInt(buyButton.price, 10)}
          currency={buyButton.currency}
          variantId={buyButton.variantId}
        />
      </Row>
    </Header>
  );
}

export default Navigation;
