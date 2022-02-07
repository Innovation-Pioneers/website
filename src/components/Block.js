import styled from 'styled-components';
import {
  position,
  display,
  space,
  color,
  background,
  size,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  flex,
  flexDirection,
  order,
  flexWrap,
  alignItems,
  justifyContent,
  alignSelf,
  justifySelf,
  textAlign,
} from 'styled-system';

const Block = styled.div`
  ${position}
  ${display}
  ${space}
  ${color}
  ${background}
  ${width}
  ${size}
  ${minWidth}
  ${maxWidth}
  ${height}
  ${minHeight}
  ${maxHeight}
  ${flex}
  ${flexDirection}
  ${order}
  ${flexWrap}
  ${alignItems}
  ${justifyContent}
  ${alignSelf}
  ${justifySelf}
  ${textAlign}
`;

Block.defaultProps = {
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

export default Block;
