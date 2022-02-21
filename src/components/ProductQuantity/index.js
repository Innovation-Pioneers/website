import React from 'react';
import styled from 'styled-components';

import { Paragraph } from '../Text';

const Span = styled.span`
  font-weight: bold;
`;

// eslint-disable-next-line react/function-component-definition
const ProductQuantity = ({
  total,
  available,
  // lang,
  textSold,
  textRemaining,
}) => (
  <div>
    <Paragraph style={{ fontSize: '120%' }}>
      <Span>{`${total - available} `}</Span>
      {`${textSold} /`}
      <Span>{` ${available} `}</Span>
      {textRemaining}
    </Paragraph>
  </div>
);

export default ProductQuantity;
