/**
 * TextBlock
 * ---------
 * extends: Block
 * props:
 *  - title: [string] **required**
 *  - text: [string] **required**
 *  - label: [string]
 *  - intro: [bool]
 *  - as: [string] `[h1, h2, h3, h4...]`
 */

import React from 'react';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import PropTypes from 'prop-types';

import Block from '../Block';
import { Title, Label, Paragraph } from '../Text';
import Space from '../Space';

const Wrapper = styled(Block)`
  z-index: 1;

  ${(props) => props.intro && css`
    &:before {
      content: '';
      position: absolute;
      top: 15px; right: 0; bottom: 0; left: 0;
      background: ${themeGet('colors.primary.base')};
      transform: translateY(50px);
    }
  `}
`;

const Slash = styled.div`
  @media(min-width: ${themeGet('breakpoints.2')}) {
    width: 4px;
    height: 1000px;
    position: absolute;
    top: 50%; left: 60%;
    background: ${themeGet('colors.secondary.shade.0')};
    transform:
      translate(-50%, -50%)
      translateX(-120px)
      translateY(15%)
      rotate(26deg);
    z-index: -1;
  }
`;

const StyledLabel = styled.p`
  font-weight: ${themeGet('fontWeights.regular')};
  font-size: ${themeGet('fontSizes.2')};
  color: ${themeGet('colors.white.base')};
`;

const Subtitle = styled(Paragraph)`
  font-weight: ${themeGet('fontWeights.bold')} !important;
  padding-top: 20px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 240px;
`;

function TextBlock({
  title, subtitle, label, text, intro, introLine, as, className, image,
}) {
  return (
    <Wrapper intro={intro} className={className}>
      {intro && <Slash className="introduction-slash-ar" /> }
      {introLine && <StyledLabel>{introLine}</StyledLabel> }
      {label && <Label>{label}</Label> }
      {image && (
        <>
          <Image src={image} alt="logo" />
          <Space height="20px" />
        </>
      )}
      <Title dangerouslySetInnerHTML={{ __html: title }} as={as} />
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Paragraph
        as="div"
        mt={[3, 4]}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </Wrapper>
  );
}

TextBlock.propTypes = {
  introLine: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  text: PropTypes.string.isRequired,
  intro: PropTypes.bool,
  as: PropTypes.string,
};

TextBlock.defaultProps = {
  subtitle: '',
  label: '',
  intro: undefined,
  introLine: undefined,
  as: 'h2',
};

export default TextBlock;
