/**
 * Slider
 * ------
 * extends: Block, TextBlock
 */

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { useTransition, animated, config } from 'react-spring';

import Block from '../Block';
import TextBlock from '../TextBlock';

const StyledBlock = styled(Block)`
  @media(min-width: ${themeGet('breakpoints.1')}) {
    max-width: 420px;
  }
`;

const Slides = styled.div`
  min-height: 150px;

  /* [data-lang="en"] & {
    min-height: 220px;
  } */
`;

const Slide = styled(animated.div)``;

const Controls = styled.div`
  display: flex;
  z-index: 9999;
  margin-top: 20px;

  align-self: flex-end;
  direction: rtl;
  [data-lang="en"] & {
    align-self: flex-start;
    direction: ltr;
  }
`;

const Dot = styled.div`
  padding: 15px 5px;
  cursor: pointer;

  &:before {
    content: '';
    display: block;

    height: 4px;
    width: ${(props) => (props.isActive ? 50 : 30)}px;
    background: ${(props) => (props.isActive
      ? themeGet('colors.primary.base')
      : themeGet('colors.secondary.shade.4')
    )};

    transition: width 500ms, background 500ms;
  }

  &:hover:before {
    width: ${(props) => (props.isActive ? 50 : 40)}px;
    background: ${(props) => (props.isActive
      ? themeGet('colors.primary.base')
      : themeGet('colors.secondary.shade.3')
    )};
  }
`;

const Numbers = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;

  position: absolute;
  top: 0; left: 0;
  transform: translateX(-100%) translateX(20px) translateY(62%);

  @media(max-width: ${themeGet('breakpoints.1')}) {
    display: none;
  }
`;

const Number = styled(animated.div)`
  position: ${(props) => (props.type === 'sub' ? 'static' : 'absolute')};
  top: 0; right: 100%;
  line-height: 0.78;
  font-weight: ${themeGet('fontWeights.heavy')};
  font-size: ${(props) => (props.type === 'sub' ? 100 : 160)}px;
  color: ${(props) => (props.type === 'sub'
    ? themeGet('colors.secondary.shade.4')
    : themeGet('colors.secondary.shade.2')
  )};

  ${(props) => props.type !== 'sub' && css`
    transform: translateY(-100%);
  `}
`;

const Slash = styled.div`
  width: 4px;
  position: absolute;
  top: -60%; bottom: -20%;
  background: ${themeGet('colors.secondary.shade.4')};
  transform: rotate(29deg);
`;

const Slider = React.memo(({ slides, className }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  function NumberSpring() {
    const transitions = useTransition(slides[activeSlide], {
      from: { opacity: 0, transform: 'translateY(-120%)' },
      enter: { opacity: 1, transform: 'translateY(-100%)' },
      leave: { opacity: 0, transform: 'translateY(-80%)' },
      config: config.stiff,
    });
    return transitions(
      (style) => (
        <Number key={activeSlide} style={style}>{activeSlide + 1}</Number>
      )
    );
  }

  function TextSpring() {
    const transition = useTransition(slides[activeSlide], {
      from: { opacity: 0, position: 'absolute', transform: 'translateX(-10%)' },
      enter: { opacity: 1, position: 'static', transform: 'translateX(0)' },
      leave: { opacity: 0, position: 'absolute', transform: 'translateX(10%)' },
      config: config.stiff,
    });
    return transition(
      (style, item) => (
        <Slide key={activeSlide} style={style}>
          <TextBlock title={item.title} text={item.text} as="h3" />
        </Slide>
      )
    );
  }

  return (
    <StyledBlock>
      <Slides className={className}>
        {TextSpring()}
      </Slides>
      <Numbers>
        {NumberSpring()}
        <Slash />
        <Number type="sub">
          {slides.length}
        </Number>
      </Numbers>
      <Controls>
        {slides.map((item, i) => (
        <Dot
          key={item.title}
          onClick={() => setActiveSlide(i)}
          isActive={activeSlide === i ? true : false}
        />
        ))}
      </Controls>
    </StyledBlock>
  );
});

export default Slider;
