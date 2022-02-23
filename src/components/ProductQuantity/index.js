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
  <Paragraph as="div" style={{ fontSize: '120%', display: 'flex' }}>
    <div>
      <Span>{`${total - available} `}</Span>
      <span>{`${textSold} `}</span>
    </div>
    <div style={{ opacity: 0.5, margin: '0 5px' }}> | </div>
    <div>
      <Span>{` ${available} `}</Span>
      <span>{textRemaining}</span>
    </div>
  </Paragraph>
);

export default ProductQuantity;
