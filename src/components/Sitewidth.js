/**
 * Sitewidth
 * ---------
 * props:
 *  - m: [string] (default: 'auto')
 *  - maxWidth: [string] (default: '1200px')
 *  - px: [array] (default: [4, 5, 6])
 */
import React from 'react';

import Block from './Block';

function Sitewidth(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Block {...props} />;
}

Sitewidth.defaultProps = {
  m: 'auto',
  maxWidth: '1200px',
  px: [4, 5, 6],
};

export default Sitewidth;
