import React from 'react';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Link as ScrollLink } from 'react-scroll';
import { Link as GatsbyLink } from 'gatsby';

import { ButtonCheckoutCart } from '../Button';
import { Link } from '../Text';

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  padding: ${themeGet('space.4')};
  background: ${themeGet('colors.primary.base')};

  @media(min-width: ${themeGet('breakpoints.0')}) {
    align-items: flex-end;
  }

  @media(min-width: 650px) {
    flex-direction: row;
    gap: 0;
  } 

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

function Navigation({
  setActiveCoverScreen,
  items,
  buyButton,
  className,
  lang,
}) {
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
            as={item.type === 'link' ? 'div' : ScrollLink}
            onClick={() => (
              item.type === 'link' ? setActiveCoverScreen(null) : null
            )}
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
      </Row>
      <ButtonCheckoutCart
        className="introduction-buyButton-ar"
        text={buyButton.text}
        textTotal={buyButton.textTotal}
        price={parseInt(buyButton.price, 10)}
        currency={buyButton.currency}
      />
    </Header>
  );
}

export default Navigation;
